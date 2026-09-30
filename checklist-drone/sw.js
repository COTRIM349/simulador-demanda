// Caminhos relativos: funciona em GitHub Pages de projeto (/simulador-demanda/checklist-drone/)
const CACHE = 'checklist-drone-v2';
const ASSETS = ['./', './index.html', './manifest.json', '../icons/icon-192.png', '../icons/icon-512.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k.startsWith('checklist-drone-') && k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Rede primeiro (pega versão nova do formulário), cache como reserva no campo sem sinal.
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    fetch(e.request)
      .then(r => {
        if (r.ok && new URL(e.request.url).origin === location.origin) {
          const copy = r.clone();
          caches.open(CACHE).then(c => c.put(e.request, copy));
        }
        return r;
      })
      .catch(() => caches.match(e.request, { ignoreSearch: true }))
  );
});
