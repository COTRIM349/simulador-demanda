/**
 * Receptor do Check-list Diário de Drones → Google Sheets
 * Implantar como: Implantar > Nova implantação > App da Web
 *   Executar como: Eu | Quem pode acessar: Qualquer pessoa
 * Colar a URL gerada (…/exec) na aba Config. do formulário.
 *
 * Um registro reaberto e salvo de novo substitui a linha anterior (mesmo id).
 */
var ABA = 'Checklists';
var COLS = ['id','recebido_em','data','hora','horafim','fazenda','local','operacao','aeronave',
  'piloto','auxiliar','vento','rajada','temp','ur','deltaT','chuva','parecer',
  'nc_criticos','nc_outros','nc_descricoes','alertas_clima','obs',
  'area','voos','produto','taxa','baterias','ocorrencias','assinado','json'];

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    var r = JSON.parse(e.postData.contents);
    var sh = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(ABA)
          || SpreadsheetApp.getActiveSpreadsheet().insertSheet(ABA);
    if (sh.getLastRow() === 0) {
      sh.appendRow(COLS);
      sh.setFrozenRows(1);
    }
    var notas = r.notas || {};
    var row = COLS.map(function (c) {
      switch (c) {
        case 'recebido_em':   return new Date();
        case 'nc_criticos':   return (r.ncCriticos || []).join(' | ');
        case 'nc_outros':     return (r.ncOutros || []).join(' | ');
        case 'nc_descricoes': return Object.keys(notas).map(function (k) { return k + ': ' + notas[k]; }).join(' | ');
        case 'alertas_clima': return (r.alertasClima || []).join(' | ');
        case 'assinado':      return r.assinado ? 'sim' : 'não';
        case 'json':          return JSON.stringify(r.respostas || {});
        default:              return r[c] == null ? '' : r[c];
      }
    });
    var ids = sh.getLastRow() > 1 ? sh.getRange(2, 1, sh.getLastRow() - 1, 1).getValues().map(String) : [];
    var i = ids.indexOf(String(r.id));
    if (i >= 0) sh.getRange(i + 2, 1, 1, row.length).setValues([row]);
    else sh.appendRow(row);
    return ContentService.createTextOutput('ok');
  } finally {
    lock.releaseLock();
  }
}
