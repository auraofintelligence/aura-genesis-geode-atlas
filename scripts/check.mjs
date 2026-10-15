import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { pages, pathways } from '../content/pages.mjs';
import { refs } from '../content/references.mjs';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const docs=JSON.parse(fs.readFileSync(path.join(root,'content/documents.json'),'utf8'));
const failures=[];let links=0;
const htmlFiles=fs.readdirSync(root).filter(n=>n.endsWith('.html'));
const ids=new Map(htmlFiles.map(f=>[f,new Set([...fs.readFileSync(path.join(root,f),'utf8').matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]))]));
for(const f of htmlFiles){const text=fs.readFileSync(path.join(root,f),'utf8');if(f!=='404.html'){
 if((text.match(/<h1[ >]/g)||[]).length!==1)failures.push(`${f}: expected one h1`);
 if(!text.includes('lang="en-AU"'))failures.push(`${f}: language`);
 for(const p of pages){const href=p.id+'.html';if(!text.includes(`href="${href}"`))failures.push(`${f}: missing menu destination ${href}`)}
 if(!text.includes('aria-label="Previous and next chapters"')||!text.includes('aria-label="Return to top"'))failures.push(`${f}: route controls`);
 const all=[...text.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);if(new Set(all).size!==all.length)failures.push(`${f}: duplicate ids`);
 }
 for(const m of text.matchAll(/<(a|img|script|link)\b([^>]*?)>/g)){
  const attrs=m[2],target=attrs.match(/(?:href|src)="([^"]+)"/);if(!target)continue;const url=target[1].replaceAll('&amp;','&');links++;
  if(/^https?:/.test(url)){if(m[1]==='a'&&!url.startsWith('https://auraofintelligence.github.io/aura-genesis-geode-atlas/')&&(!attrs.includes('target="_blank"')||!attrs.includes('noopener noreferrer')))failures.push(`${f}: external link attributes ${url}`);continue}
  if(/^(mailto:|data:)/.test(url))continue;
  const [raw,anchor]=url.split('#'),name=raw||f;const local=path.resolve(root,name);
  if(!fs.existsSync(local)){failures.push(`${f}: missing target ${url}`);continue}
  if(anchor&&!anchor.startsWith('page=')&&name.endsWith('.html')&&!ids.get(name)?.has(anchor))failures.push(`${f}: missing anchor ${url}`);
  if(m[1]==='img'&&!attrs.includes('alt='))failures.push(`${f}: image alt`);
 }
 if(/TODO|lorem ipsum|placeholder image|undefined|\[object Object\]/i.test(text))failures.push(`${f}: unfinished content`);
}
for(const d of docs){const hash=crypto.createHash('sha256').update(fs.readFileSync(path.join(root,'documents',d.filename))).digest('hex');if(hash!==d.sha256)failures.push(`Source PDF changed: ${d.filename}`)}
const set=new Set(refs.map(r=>r.url));for(const d of docs)for(const l of d.links)if(!set.has(l.url))failures.push(`Unregistered PDF website: ${l.url}`);
if(new Set(refs.map(r=>r.id)).size!==refs.length)failures.push('Duplicate reference IDs');
for(let d=1;d<=60;d++){const chapter=Math.ceil(d/10);const text=fs.readFileSync(path.join(root,`learning-${chapter}.html`),'utf8');if(!text.includes(`id="day-${d}"`)||!text.includes(`#page=${d}`))failures.push(`Missing day ${d}`)}
for(const p of pathways)if(!fs.existsSync(path.join(root,`${p.id}.html`)))failures.push(`Missing pathway ${p.id}`);
for(const file of ['assets/style.css','assets/app.js'])if(!fs.readFileSync(path.join(root,file),'utf8').includes('reduced'))failures.push(`${file}: reduced motion`);
if(failures.length){console.error(failures.join('\n'));process.exit(1)}
console.log(`PASS: ${pages.length} public pages + 404; ${links} local/external links; 60 daily readings; all four pathways; ${refs.length} reference identities; 3 original PDF hashes; complete navigation and anchors.`);
