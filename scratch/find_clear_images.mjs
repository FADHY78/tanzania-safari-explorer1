import fs from 'fs';
import https from 'https';
import http from 'http';

const content = fs.readFileSync('constants.tsx', 'utf8');
const urls = [...content.matchAll(/https?:\/\/[^\s'"\\)\]]+/g)].map(m => m[0]);
const unique = [...new Set(urls)].filter(u => 
  /\.(jpeg|jpg|png|webp)/i.test(u) && (u.includes('zara') || u.includes('aluli') || u.includes('safari56'))
);

console.log('Total unique package images found:', unique.length);

async function testUrl(url) {
  return new Promise((resolve) => {
    try {
      const client = url.startsWith('https') ? https : http;
      const req = client.request(url, { method: 'HEAD', timeout: 6000 }, (res) => {
        resolve({ url, status: res.statusCode, length: parseInt(res.headers['content-length'] || '0', 10) });
      });
      req.on('error', () => resolve({ url, status: 'error', length: 0 }));
      req.on('timeout', () => { req.destroy(); resolve({ url, status: 'timeout', length: 0 }); });
      req.end();
    } catch (e) {
      resolve({ url, status: 'error', length: 0 });
    }
  });
}

(async () => {
  const tested = [];
  for (let i = 0; i < unique.length; i += 15) {
    const chunk = unique.slice(i, i + 15);
    const res = await Promise.all(chunk.map(testUrl));
    tested.push(...res);
  }

  const ok = tested.filter(r => r.status === 200 && r.length > 50000);
  ok.sort((a, b) => b.length - a.length);

  console.log('\n--- TOP CLEAR HIGH-RES IMAGES (>50KB) ---');
  ok.forEach(o => {
    const isZanzibar = /zanzibar|aluli|beach|ocean|spice|atoll|turtle|stone-town|prison|nakupenda|safari-blue/i.test(o.url);
    const isSafari = /safari|serengeti|ngorongoro|lion|tarangire|kili|wildlife|elephant|elep|leopard|cheetah/i.test(o.url);
    console.log(`[${Math.round(o.length/1024)} KB] [${isZanzibar ? 'ZANZIBAR' : isSafari ? 'SAFARI' : 'TOUR'}] ${o.url}`);
  });
})();
