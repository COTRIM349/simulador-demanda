/**
 * Receptor do Check-list Drone → Google Sheets (+ fotos no Google Drive)
 *
 * Implantar: Implantar > Nova implantação > Tipo: App da Web
 *   Executar como: Eu  |  Quem pode acessar: Qualquer pessoa
 * Copiar a URL (…/exec) e colar na aba Config. do formulário
 * (ou fixar na constante SHEETS_URL do index.html).
 *
 * Reenvio do mesmo check-list (mesmo id) é ignorado — não duplica linha.
 */
var ABA = 'Checklists';
var PASTA_FOTOS = 'Check-list Drone - Fotos';

// [chave enviada pelo formulário, título da coluna]
var COLS = [
  ['id', 'ID'],
  ['abertura', 'Data/hora preenchimento'],
  ['envio', 'Data/hora envio'],
  ['piloto', 'Piloto'], ['piloto_outro', 'Piloto (outro)'],
  ['turno', 'Turno'],
  ['setor', 'Setor'], ['setor_outro', 'Setor (outro)'],
  ['aeronave', 'Aeronave'],
  ['vento_valor', 'Vento (km/h)'], ['vento', 'Vento - avaliação'],
  ['temp_valor', 'Temperatura (°C)'], ['temp', 'Temperatura - avaliação'],
  ['umid_valor', 'Umidade (%)'], ['umid', 'Umidade - avaliação'],
  ['clima_obs', 'Clima - observações'], ['@clima_obs', 'Clima - fotos'],
  ['ger_cond', 'Gerador - condições'], ['ger_oleo', 'Gerador - óleo necessita troca'],
  ['ger_obs', 'Gerador - observações'], ['@ger_obs', 'Gerador - fotos'],
  ['carcaca', 'Drone - carcaça'], ['helices', 'Drone - hélices e motores'],
  ['pulv', 'Drone - sistema de pulverização'], ['seguranca', 'Drone - câmeras e sensores'],
  ['limp_drone', 'Limpeza do drone (0-3)'], ['limp_tanque', 'Limpeza do tanque (0-3)'], ['descontaminado', 'Tanque e sistema de pulverização descontaminados'],
  ['atualizada', 'Aeronave atualizada'], ['atualizada_pq', 'Aeronave atualizada - por quê'],
  ['erro_controle', 'Erro no controle'], ['erro_qual', 'Erro no controle - qual'], ['@erro_qual', 'Erro no controle - fotos'],
  ['misturador', 'Misturador em bom funcionamento'], ['misturador_pq', 'Misturador - por quê'],
  ['drone_obs', 'Drone - observações'], ['@drone_obs', 'Drone - fotos'],
  ['veic_falha', 'Veículo apresentou falha'], ['veic_qual', 'Veículo - qual falha'], ['@veic_qual', 'Veículo - fotos da falha'],
  ['carretinha', 'Carretinha com avaria'], ['carr_qual', 'Carretinha - qual avaria'], ['@carr_qual', 'Carretinha - fotos da avaria'],
  ['veic_obs', 'Veículo/carretinha - observações'], ['@veic_obs', 'Veículo/carretinha - fotos'],
  ['atencao', 'Pontos de atenção']
];

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(30000);
  try {
    var r = JSON.parse(e.postData.contents);
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sh = ss.getSheetByName(ABA) || ss.insertSheet(ABA);
    if (sh.getLastRow() === 0) {
      sh.appendRow(COLS.map(function (c) { return c[1]; }));
      sh.setFrozenRows(1);
      sh.getRange(1, 1, 1, COLS.length).setFontWeight('bold');
    }
    if (sh.getLastRow() > 1) {
      var ids = sh.getRange(2, 1, sh.getLastRow() - 1, 1).getValues().map(function (x) { return String(x[0]); });
      if (ids.indexOf(String(r.id)) >= 0) return ContentService.createTextOutput('duplicado');
    }
    var fotos = r.fotos || {};
    var pasta = null;
    var row = COLS.map(function (c) {
      var k = c[0];
      if (k.charAt(0) !== '@') return r[k] == null ? '' : r[k];
      var lista = fotos[k.slice(1)] || [];
      if (!lista.length) return '';
      pasta = pasta || obterPasta();
      return lista.map(function (b64, i) {
        var blob = Utilities.newBlob(Utilities.base64Decode(b64), 'image/jpeg',
          r.id + '_' + k.slice(1) + '_' + (i + 1) + '.jpg');
        return pasta.createFile(blob).getUrl();
      }).join('\n');
    });
    sh.appendRow(row);
    return ContentService.createTextOutput('ok');
  } finally {
    lock.releaseLock();
  }
}

function obterPasta() {
  var it = DriveApp.getFoldersByName(PASTA_FOTOS);
  return it.hasNext() ? it.next() : DriveApp.createFolder(PASTA_FOTOS);
}
