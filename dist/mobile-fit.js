(() => {
 'use strict';
 // The sub-pages were designed landscape; on a portrait phone Canva scales them to
 // the screen width, which leaves the lower half empty. This re-centres their content
 // and pulls follow-on blocks up.
 const PAGES=['/our-song','/love-coupons','/my-favorite-moments'];
 const GAP=24; // breathing room
 let last='';
 function contentBox(section){
  let t=1e9,b=-1e9,l=1e9,r=-1e9;
  for(const e of section.querySelectorAll('img,p,a,iframe,svg,video,.song-card')){
   const box=e.getBoundingClientRect();
   if(box.width<4||box.height<4||box.width>section.clientWidth*.98)continue;
   t=Math.min(t,box.top);b=Math.max(b,box.bottom);l=Math.min(l,box.left);r=Math.max(r,box.right);
  }
  return t<b?{top:t,bottom:b,left:l,right:r}:null;
 }
 function reset(section){
  const inner=section.firstElementChild;
  if(inner){inner.style.transform='';inner.style.transformOrigin='';}
  section.style.marginBottom='';
 }
 function fit(){
  const section=document.querySelector('section.rGeu6w');
  if(!section)return;
  const path=location.pathname.replace(/\/$/,'');
  const portrait=innerWidth<720&&innerHeight>innerWidth*1.15;
  const key=path+'|'+innerWidth+'x'+innerHeight+'|'+(section.nextElementSibling?.className||'');
  if(key===last&&section.dataset.fitted)return;
  last=key;reset(section);delete section.dataset.fitted;
  if(!portrait||!PAGES.includes(path))return;
  const inner=section.firstElementChild, base=section.getBoundingClientRect(), box=contentBox(section);
  if(!inner||!box)return;
  const top=box.top-base.top, h=box.bottom-box.top;
  const follow=section.nextElementSibling?.classList.contains('coupon-photos');
  // The design already spans the full width, so it is moved, not enlarged
  // (enlarging would crop the decorations at the edges).
  if(follow){
   // content at the top, the photo block directly underneath
   // (Canva re-centres the design if the section is shortened, so its unused
   // lower part is overlapped by a negative margin instead.)
   inner.style.transform=`translateY(${GAP-top}px)`;
   section.style.marginBottom=-Math.max(0,Math.floor(base.height-h-GAP*2))+'px';
  }else{
   const offset=Math.max(GAP,(innerHeight-h)/2);
   inner.style.transform=`translateY(${offset-top}px)`;
  }
  section.dataset.fitted='1';
 }
 let queued=false;
 const schedule=()=>{if(queued)return;queued=true;setTimeout(()=>{queued=false;requestAnimationFrame(fit);},120);};
 function mount(){
  new MutationObserver(schedule).observe(document.body,{childList:true,subtree:true});
  addEventListener('resize',()=>{last='';schedule();});
  addEventListener('popstate',schedule);
  schedule();
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount,{once:true});else mount();
})();
