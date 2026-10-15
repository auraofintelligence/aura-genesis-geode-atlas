(() => {
  'use strict';
  const $=(s,c=document)=>c.querySelector(s), $$=(s,c=document)=>[...c.querySelectorAll(s)];
  $$('[data-filter-tools]').forEach(e=>e.hidden=false);
  const menu=$('.all-pages');
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&menu?.open){menu.open=false;$('summary',menu).focus()}});
  document.addEventListener('click',e=>{if(menu?.open&&!menu.contains(e.target))menu.open=false});
  function installFilter(input,select,items,group,empty,status,suffix){
    if(!input)return;const update=()=>{const q=input.value.trim().toLowerCase(),kind=select?.value||'';let count=0;items.forEach(e=>{const yes=(!q||e.dataset.search.includes(q))&&(!kind||group(e)===kind);e.hidden=!yes;if(yes)count++});if(empty)empty.hidden=count!==0;if(status)status.textContent=`${count} ${suffix}${count===1?'':'s'}`;$$('.orbit').forEach(e=>e.hidden=!$$('.atlas-node',e).some(n=>!n.hidden));drawMap()};input.addEventListener('input',update);select?.addEventListener('change',update);update();
  }
  installFilter($('#atlas-search'),$('#atlas-group'),$$('.atlas-node'),e=>e.closest('.orbit').dataset.world,$('.map-empty'),$('#atlas-count'),'destination');
  installFilter($('#reference-search'),$('#reference-kind'),$$('.reference-item'),e=>e.dataset.kind,$('.ref-empty'),$('#reference-count'),'reference');
  installFilter($('#material-search'),null,$$('.material-card'),()=>'', $('.material-empty'),$('#material-count'),'material');
  if($('#material-count'))$('#material-count').hidden=false;
  const key='aura-geode-learning-bookmarks-v1';let saved=[];let storage=true;
  try{const raw=JSON.parse(localStorage.getItem(key)||'[]');saved=Array.isArray(raw)?raw.filter(d=>Number.isInteger(d)&&d>=1&&d<=60):[];localStorage.setItem(key,JSON.stringify(saved))}catch{storage=false}
  function updateBookmarks(){
    $$('.bookmark').forEach(b=>{const on=saved.includes(+b.dataset.day);b.hidden=!storage;b.setAttribute('aria-pressed',String(on));b.textContent=on?'Bookmarked ✓':'Bookmark'});
    $$('.bookmark-summary').forEach(e=>{e.hidden=false;e.textContent=storage?`${saved.length} of 60 days bookmarked in this browser.`:'Learning bookmarks are unavailable because browser storage is disabled. All source readings remain available.'});
    $$('.reset-bookmarks').forEach(b=>b.hidden=!storage||!saved.length);
  }
  $$('.bookmark').forEach(b=>b.addEventListener('click',()=>{const d=+b.dataset.day;saved=saved.includes(d)?saved.filter(x=>x!==d):[...saved,d];try{localStorage.setItem(key,JSON.stringify(saved))}catch{storage=false}updateBookmarks()}));
  $$('.reset-bookmarks').forEach(b=>b.addEventListener('click',()=>{saved=[];try{localStorage.removeItem(key)}catch{storage=false}updateBookmarks()}));updateBookmarks();
  const nodes=$$('.reference-item');if(nodes.length)fetch('assets/link-status.json').then(r=>{if(!r.ok)throw Error('No report');return r.json()}).then(data=>nodes.forEach(n=>{const spot=$('.reachability',n),r=data.results.find(r=>r.url===spot.dataset.url);if(r)spot.textContent=`Link check ${data.checked}: ${r.status==='ok'?'HTTP response received':r.status==='redirect'?'redirected to source':r.status==='blocked'?'automated access restricted':r.status==='missing'?'source URL currently unavailable':'automated check inconclusive'}.`})).catch(()=>{});
  function drawMap(){const canvas=$('.map-lines'),centre=$('.constellation-centre');if(!canvas||!centre)return;const box=canvas.parentElement.getBoundingClientRect();if(!box.width)return;const dpr=Math.min(window.devicePixelRatio||1,2);canvas.width=box.width*dpr;canvas.height=box.height*dpr;const c=canvas.getContext('2d');c.scale(dpr,dpr);const hub=centre.getBoundingClientRect(),cx=hub.left-box.left+hub.width/2,cy=hub.top-box.top+hub.height/2;c.lineWidth=1;$$('.orbit').filter(n=>!n.hidden).forEach((n,i)=>{const b=n.getBoundingClientRect(),x=b.left-box.left+b.width/2,y=b.top-box.top+b.height/2;c.strokeStyle=['#b8e5c344','#e9cc8e44','#c9b9ec44','#a9d8e044','#d7eb9d44','#e6bba744'][i%6];c.beginPath();c.moveTo(cx,cy);c.quadraticCurveTo(cx+(x-cx)*.2,y,x,y);c.stroke();c.fillStyle='#b8e5c3';c.beginPath();c.arc(x,y,3,0,Math.PI*2);c.fill()})}
  if($('.constellation'))new ResizeObserver(drawMap).observe($('.constellation'));
})();
