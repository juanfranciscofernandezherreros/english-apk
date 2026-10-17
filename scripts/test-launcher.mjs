import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

const xml = readFileSync('config.xml', 'utf8');
const html = readFileSync('www/start.html', 'utf8');
const offline = readFileSync('www/index.html', 'utf8');

assert.match(xml, /<content src="start\.html"\s*\/>/);
assert.match(xml, /<allow-navigation href="https:\/\/jnfz92\.github\.io\/\*" \/>/);
assert.doesNotMatch(xml, /<allow-navigation href="\*" \/>/);
assert.match(html, /https:\/\/jnfz92\.github\.io\/index\.html/);
assert.match(html, /href="index\.html"/);
assert.match(html, /id="onlineProgress"/);
assert.match(html, /https:\/\/jnfz92\.github\.io\/perfil\.html/);
assert.match(offline, /Ver mi progreso y repasar errores en línea/);
assert.match(xml, /version="1\.1\.3"/);
assert.ok(offline.includes('account-auth.js'));
assert.ok(html.includes('img/logo.svg'));
const logo=readFileSync('www/img/logo.svg','utf8');
const adaptiveIcon=readFileSync('res/android/icon-foreground.xml','utf8');
assert.match(logo, /aria-label="Easy English e.e"/);
assert.match(adaptiveIcon, /android:fillColor="#FFF8E8"/);
assert.match(offline, /blog-data-6\.js/);
const latestWriting = readFileSync('www/blog-data-6.js', 'utf8');
const blogContext = { window: {} };
vm.runInNewContext(latestWriting, blogContext);
assert.equal(blogContext.window.EASY_ENGLISH_BLOG.length, 1);
assert.match(blogContext.window.EASY_ENGLISH_BLOG[0].title, /tiempos verbales.*carta.*email/i);
assert.match(blogContext.window.EASY_ENGLISH_BLOG[0].html, /I've been looking forward/);

const match = html.match(/<script>([\s\S]*?)<\/script>/);
assert.ok(match, 'Missing launcher inline JavaScript');
new vm.Script(match[1], { filename: 'www/start.html' });

function launchHarness(online) {
  const events = {};
  const elements = {
    status: { textContent: '' },
    retry: { disabled: false, addEventListener: (type, fn) => { events['retry:' + type] = fn; } }
  };
  const navigator = { onLine: online };
  const redirects = [];
  let requests = 0;
  const document = {
    getElementById: id => elements[id],
    addEventListener: (type, fn) => { events['document:' + type] = fn; }
  };
  const window = {
    location: { replace: url => redirects.push(url) },
    addEventListener: (type, fn) => { events['window:' + type] = fn; }
  };
  const context = {
    navigator, window, document, AbortController,
    setTimeout, clearTimeout,
    fetch: async () => { requests++; return { type: 'opaque' }; }
  };
  vm.runInNewContext(match[1], context);
  return { events, navigator, elements, redirects, getRequests: () => requests };
}

const offlineApp = launchHarness(false);
await offlineApp.events['document:DOMContentLoaded']();
assert.equal(offlineApp.getRequests(), 0, 'Offline mode should not fetch');
assert.equal(offlineApp.redirects.length, 0, 'Offline mode should not navigate');
assert.match(offlineApp.elements.status.textContent, /No hay conexión/);
offlineApp.navigator.onLine = true;
await offlineApp.events['retry:click']();
assert.equal(offlineApp.getRequests(), 1);
assert.deepEqual(offlineApp.redirects, ['https://jnfz92.github.io/index.html']);

const onlineApp = launchHarness(true);
await onlineApp.events['document:DOMContentLoaded']();
assert.equal(onlineApp.getRequests(), 1);
assert.deepEqual(onlineApp.redirects, ['https://jnfz92.github.io/index.html']);

console.log('PASS: WebView navigation, live URL, offline fallback and retry');
