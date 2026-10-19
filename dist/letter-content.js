(() => {
 'use strict';
 const content=`
  <nav class="letter-navigation" aria-label="Navigasi surat"><a class="letter-back" href="/happy-birthday"><span aria-hidden="true">←</span> Kembali</a></nav>
  <header class="letter-heading"><h1>My Letter to You <span class="letter-heart">♡</span></h1></header>
  <article class="personal-letter-paper" aria-label="Surat ulang tahun untuk Sayang">
   <img class="letter-blue-hearts" src="/_assets/media/c663c6599d7b1fbcbd8781d5755a17c4.png" alt="" aria-hidden="true">
   <div class="letter-copy">
    <h2>Selamat Ulang Tahun, Sayangggg! 🤍</h2>
    <p>Sayang, selamat bertambah usia, yaa. Aku bersyukur banget bisa mengenal dan memiliki kamu dalam hidupku. Terima kasih sudah hadir, memberikan warna di hari-hariku, dan menjadi salah satu alasan aku tersenyum. Kamu adalah seseorang yang begitu istimewa buatku, lebih dari yang bisa aku ungkapkan lewat kata-kata.</p>
    <p>Di hari spesialmu ini, aku berharap kamu selalu bahagia, sehat, dan dikelilingi hal-hal baik. Semoga semua impianmu bisa tercapai dan setiap langkahmu dipermudah. Kalau suatu hari dunia terasa berat, jangan lupa kalau kamu nggak harus menghadapi semuanya sendirian. Aku akan selalu berusaha ada buat kamu.</p>
    <p>Aku memang nggak sempurna, tapi aku ingin terus belajar menjadi seseorang yang bisa membahagiakanmu. Semoga kita bisa terus bersama, saling menguatkan, dan merayakan lebih banyak ulang tahun lagi di masa depan.</p>
    <p><strong>I love you, Sayangggg.</strong> Terima kasih sudah menjadi bagian indah dalam hidupku. Semoga hari ini membawa banyak senyum untukmu, karena kamu pantas mendapatkan semua kebahagiaan di dunia. 🤍</p>
    <footer class="letter-signoff"><p><strong>With all my love,</strong></p><p><em>Your favorite person</em> ♡</p><p class="letter-signature">Junaa</p></footer>
   </div>
  </article>
  <div class="personal-letter-photos" aria-label="Foto kita">
   <figure class="letter-polaroid"><img src="/_assets/personal/our-photo-1.png" alt="Foto kenangan bersama yang pertama" loading="eager" width="720" height="1280"><span class="polaroid-heart" aria-hidden="true">♡</span></figure>
   <figure class="letter-polaroid"><img src="/_assets/personal/our-photo-2.png" alt="Foto kenangan bersama yang kedua" loading="eager" width="960" height="1280"><span class="polaroid-heart" aria-hidden="true">♡</span></figure>
  </div>
  <a class="letter-end-back letter-back" href="/happy-birthday">← Kembali ke kejutanmu</a>
 `;
 let page;
 function refresh(){
  if(!page)return;
  const visible=location.pathname.replace(/\/$/,'')==='/my-letter-to-you';
  const changed=page.hidden===visible;
  page.hidden=!visible;document.body.classList.toggle('personal-letter',visible);
  if(changed)requestAnimationFrame(()=>window.scrollTo({top:0,left:0,behavior:'instant'}));
  if(visible){
   document.title='My Letter to You ♡';
   if(changed&&!matchMedia('(prefers-reduced-motion: reduce)').matches)page.animate([{opacity:0,transform:'translateY(12px)'},{opacity:1,transform:'translateY(0)'}],{duration:650,easing:'cubic-bezier(.22,1,.36,1)'});
  }
 }
 function mount(){
  page=document.createElement('main');page.id='personal-letter-page';page.className='personal-letter-page';page.hidden=true;page.innerHTML=content;
  document.body.append(page);
  page.querySelectorAll('.letter-back').forEach(link=>link.addEventListener('click',event=>{
   if(event.ctrlKey||event.metaKey||event.shiftKey||event.altKey)return;
   const original=[...document.querySelectorAll('section.rGeu6w a')].find(a=>a.getAttribute('href')?.endsWith('#page-0'));
   if(original){event.preventDefault();original.click();}
  }));
  refresh();
 }
 window.BirthdayLetter={refresh};
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount,{once:true});else mount();
})();
