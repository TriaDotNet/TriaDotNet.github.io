(() => {
 'use strict';
 const ROUTE='/love-coupons';
 const content=`
  <h2 class="coupon-photos-title">our little moments <span aria-hidden="true">♡</span></h2>
  <div class="coupon-photos-grid">
   <figure class="cp-frame cp-polaroid"><span class="cp-tape" aria-hidden="true"></span><img src="/_assets/personal/coupon-photo-1.webp" alt="Foto kita berdua di depan cermin" width="720" height="1280" loading="lazy" style="object-position:50% 58%"><figcaption>cheese please! 📸</figcaption><span class="cp-sticker cp-heart" aria-hidden="true">♥</span></figure>
   <figure class="cp-frame cp-scallop"><img src="/_assets/personal/coupon-photo-2.webp" alt="Foto kita berdua dengan papan Teknologi Informasi" width="720" height="1280" loading="lazy" style="object-position:50% 62%"><figcaption>duo anak TI 💻</figcaption><span class="cp-sticker cp-star" aria-hidden="true">★</span><span class="cp-sticker cp-star cp-star-2" aria-hidden="true">✦</span></figure>
   <figure class="cp-frame cp-polaroid cp-tilt-right"><span class="cp-tape cp-tape-pink" aria-hidden="true"></span><img src="/_assets/personal/coupon-photo-3.webp" alt="Selfie kita berdua sambil memegang foto photobooth" width="720" height="1280" loading="lazy" style="object-position:50% 45%"><figcaption>muka random, sayang beneran 🤪</figcaption><span class="cp-sticker cp-smile" aria-hidden="true">☺</span></figure>
  </div>`;
 let block;
 function sync(){
  const onPage=location.pathname.replace(/\/$/,'')===ROUTE;
  const section=document.querySelector('section.rGeu6w');
  if(!onPage||!section){block?.remove();return;}
  if(!block){block=document.createElement('div');block.className='coupon-photos';block.innerHTML=content;}
  if(section.nextElementSibling!==block)section.after(block);
 }
 let queued=false;
 const schedule=()=>{if(queued)return;queued=true;requestAnimationFrame(()=>{queued=false;sync();});};
 function mount(){
  new MutationObserver(schedule).observe(document.body,{childList:true,subtree:true});
  for(const method of ['pushState','replaceState']){const original=history[method];history[method]=function(...args){const result=original.apply(this,args);schedule();return result;};}
  addEventListener('popstate',schedule);
  sync();
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount,{once:true});else mount();
})();
