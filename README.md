# Simulador de Demanda kW — PWA

## Estrutura dos arquivos

```
simulador-pwa/
├── index.html       ← app principal
├── manifest.json    ← configuração PWA
├── sw.js            ← service worker (offline)
└── icons/
    ├── icon-192.png
    └── icon-512.png
```

## Como publicar (GitHub Pages — gratuito)

1. Crie uma conta em https://github.com se ainda não tiver
2. Crie um repositório novo (ex: `simulador-demanda`)
3. Faça upload de todos os arquivos desta pasta
4. Vá em **Settings → Pages → Source: main branch → / (root)**
5. Aguarde ~1 min. URL será: `https://SEU_USUARIO.github.io/simulador-demanda`

## Como instalar no celular

### Android (Chrome)
1. Abra a URL no Chrome
2. Toque no menu (⋮) → "Adicionar à tela inicial"
3. Confirme — o app aparece como ícone nativo

### iPhone (Safari)
1. Abra a URL no Safari
2. Toque no botão Compartilhar (□↑) → "Adicionar à Tela de Início"
3. Confirme

## Funciona offline?
Sim. Após o primeiro acesso, o app fica em cache. Funciona sem internet.
Chart.js também é cacheado na primeira carga.
