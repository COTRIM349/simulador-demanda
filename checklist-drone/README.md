# Check-list Diário — Operação com Drones

Formulário web (PWA) para o check-list de pré-voo e registro diário da operação com drones
(pulverização, sólidos/semeadura, mapeamento e inspeção). Funciona **offline** no campo.

URL após publicar no GitHub Pages: `https://SEU_USUARIO.github.io/simulador-demanda/checklist-drone/`

## O que o formulário faz

- **Itens por tipo de operação** — documentação/equipe, área e segurança, aeronave,
  sistema de aplicação (ou carga útil, em mapeamento/inspeção), baterias e controle.
  Cada item: OK / NC / N/A. NC exige descrição da não conformidade.
- **Clima no local** — vento, rajada, temperatura, UR e chuva prevista. Calcula o **Delta T**
  (bulbo úmido por Stull, 2011) e sinaliza faixas de referência para aplicação
  (vento 3–10 km/h, T ≤ 30 °C, UR ≥ 55 %, ΔT 2–8 °C). Bula e fabricante prevalecem.
- **Parecer automático**
  - **NÃO APTO**: qualquer item CRÍTICO em NC, vento > 15 km/h ou ΔT > 10 °C (aplicação).
  - **APTO COM RESTRIÇÃO**: NC não crítica ou alerta de clima — obriga registrar a restrição.
  - **APTO**: tudo conforme.
- **Pós-operação** — área (ha), voos, produto/dose, taxa, baterias, ocorrências. Dá para
  reabrir o registro pelo Histórico no fim do dia e salvar de novo.
- **Assinatura** do piloto na tela.
- **Histórico** no aparelho, exportação **CSV** (abre no Excel), **compartilhar** resumo
  por WhatsApp.
- **Envio para Google Sheets** (opcional) com fila offline: sem sinal, guarda e reenvia
  quando a conexão volta.

## Ligar a planilha (Google Sheets)

1. Crie uma planilha no Google Drive.
2. Menu **Extensões → Apps Script**, apague o conteúdo e cole o arquivo `apps-script.gs`.
3. **Implantar → Nova implantação → App da Web**
   - Executar como: **Eu**
   - Quem pode acessar: **Qualquer pessoa**
4. Autorize e copie a URL terminada em `/exec`.
5. No formulário, aba **Config.** → cole a URL → **Salvar** → **Testar envio**.

Cada registro vira uma linha na aba `Checklists`. Reenviar o mesmo registro atualiza a linha
(não duplica). A assinatura fica só no aparelho; na planilha vai o campo `assinado = sim/não`.

## Ajustar os itens

Os itens ficam no array `SECTIONS` no início do `<script>` em `index.html`.
`crit: true` torna o item bloqueante; `ops: [...]` limita o item a tipos de operação.
