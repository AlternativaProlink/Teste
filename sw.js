// Service worker do InfraControl
// Faz o app abrir mesmo sem internet. Os envios para a planilha NÃO passam por aqui
// (a fila de envio continua sendo feita pelo próprio app, no aparelho).
// Ao publicar uma versão nova do index.html, troque o número abaixo.
const CACHE = 'infracontrol-v2.6';
const ARQUIVOS = ['./', './index.html', './empresa.js', './manifest.webmanifest', './icon-192.png', './icon-512.png', './icon-maskable-512.png', './apple-touch-icon.png', './favicon-32.png'];

self.addEventListener('install', e => {
    e.waitUntil((async () => {
        const c = await caches.open(CACHE);
        await c.addAll(ARQUIVOS);
        await self.skipWaiting();
    })());
});

self.addEventListener('activate', e => {
    e.waitUntil((async () => {
        const nomes = await caches.keys();
        await Promise.all(nomes.filter(n => n !== CACHE).map(n => caches.delete(n)));
        await self.clients.claim();
    })());
});

self.addEventListener('fetch', e => {
    const req = e.request;
    if (req.method !== 'GET') return;
    const url = new URL(req.url);
    if (url.hostname.endsWith('google.com') || url.hostname.endsWith('googleusercontent.com')) return; // planilha: sempre rede

    // página: tenta a rede (versão mais nova); sem sinal, abre a cópia salva
    if (req.mode === 'navigate') {
        e.respondWith((async () => {
            try {
                const r = await Promise.race([fetch(req), new Promise((_, rej) => setTimeout(() => rej(new Error('timeout')), 5000))]);
                const c = await caches.open(CACHE); c.put('./index.html', r.clone());
                return r;
            } catch (err) {
                return (await caches.match('./index.html')) || (await caches.match('./')) || Response.error();
            }
        })());
        return;
    }

    // empresa.js: rede primeiro (para trocas de configuração valerem logo), cópia salva sem sinal
    if (url.origin === location.origin && url.pathname.endsWith('/empresa.js')) {
        e.respondWith((async () => {
            const c = await caches.open(CACHE);
            try { const r = await fetch(req); if (r.ok) c.put(req, r.clone()); return r; }
            catch (err) { return (await c.match(req)) || Response.error(); }
        })());
        return;
    }

    // arquivos do app e imagens (inclui a logo da empresa): usa a cópia salva e atualiza em segundo plano
    if (url.origin === location.origin || req.destination === 'image') {
        e.respondWith((async () => {
            const c = await caches.open(CACHE);
            const salvo = await c.match(req);
            const rede = fetch(req).then(r => { if (r && (r.ok || r.type === 'opaque')) c.put(req, r.clone()); return r; }).catch(() => null);
            return salvo || (await rede) || Response.error();
        })());
    }
});
