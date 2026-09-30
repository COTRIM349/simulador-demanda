# Check-list Drone

Formulário web (PWA) do check-list diário da operação com drones T100, montado a partir do
documento `check_list.docx`. Funciona no celular, **inclusive sem sinal**.

Endereço após publicar no GitHub Pages:
`https://SEU_USUARIO.github.io/simulador-demanda/checklist-drone/`

## Perguntas

**Parte 1 — Dados do responsável**
- Piloto: Aloísio / Marco / Outro → se "Outro", abre campo para o nome
- Turno: Diurno / Noturno
- Data e horário de preenchimento: automáticos, na abertura do formulário
- Setor: Grãos / Cacau / Outro (com campo "Qual setor?")
- Aeronave: T100 01 / T100 02 / Ambos os T100

**Parte 2 — Clima e tempo**
- Vento (km/h), temperatura (°C) e umidade (%): valor + Apto / Não apto / Adaptável
- Observações com foto

**Parte 3 — Equipamentos**
- Gerador: condições (Apto / Não apto / Corrigível); óleo necessita troca (Sim/Não); observações com foto
- Drone: carcaça (Apta / Não apta); hélices e motores, sistema de pulverização, câmeras e sensores
  (Apto / Não apto / Corrigível); limpeza do drone e limpeza do tanque (nível 0 a 5,
  0 = muito sujo, 5 = totalmente limpo); aeronave atualizada (Não → "Por quê?"); erro no controle
  (Sim → "Qual?" + foto); misturador em bom funcionamento (Não → "Por quê?"); observações com foto
- Veículo e carretinha: falha no veículo (Sim → "Qual?" + foto); avaria na carretinha
  (Sim → "Qual?" + foto); observações com foto

Todas as perguntas de opção são obrigatórias; observações e fotos são opcionais.
No fim do formulário aparece um **resumo dos pontos de atenção** (Não apto, Corrigível,
Adaptável, limpeza 0 a 3, erro, falha, avaria, troca de óleo, aeronave desatualizada).

## Onde ficam as respostas

- **No aparelho**: aba Histórico (ver, compartilhar, exportar CSV).
- **Compartilhar**: resumo em texto + fotos pelo WhatsApp.
- **Google Sheets** (recomendado): uma linha por check-list; fotos numa pasta do Google Drive,
  com link na planilha. Sem sinal, fica na fila e é enviado quando a conexão volta.

### Ligar a planilha

1. Crie uma planilha no Google Drive (com a conta que vai guardar os dados).
2. **Extensões → Apps Script**, apague o conteúdo e cole `apps-script.gs`.
3. **Implantar → Nova implantação → App da Web** — Executar como: **Eu**;
   Quem pode acessar: **Qualquer pessoa**. Autorize (planilha + Drive).
4. Copie a URL `…/exec`.
5. Melhor opção: coloque a URL na constante `SHEETS_URL` no início do `<script>` do
   `index.html` — assim nenhum piloto precisa configurar nada. Alternativa: colar em
   **Config.** em cada celular e tocar **Testar envio**.
