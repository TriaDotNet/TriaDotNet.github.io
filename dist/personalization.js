(() => {
 'use strict';
 const BACKGROUND='apZ-FtdD4VE', SONG='gN79oyvYE-Q';
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 const nativeAnimate=Element.prototype.animate;
 Element.prototype.animate=function(frames,options){
  const opts=typeof options==='number'?{duration:options}:{...options};
  if(reduced.matches){opts.duration=1;opts.delay=0;opts.iterations=1;}
  else if(opts.iterations!==Infinity){
   if(typeof opts.duration!=='number'||opts.duration>200)opts.easing='cubic-bezier(.22,1,.36,1)';
  }
  return nativeAnimate.call(this,frames,opts);
 };
 let backgroundPlayer, wanted=false, songPlaying=false, apiReady=false, started=false;
 const songPlayers=new WeakSet();
 let button,label,panel,note;
 const icon='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M9 18V5l12-2v13M9 8l12-2"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>';
 function update(state){
  button.setAttribute('aria-pressed',String(wanted));
  label.textContent=state||(songPlaying&&wanted?'Musik dijeda':wanted?'Musik menyala':'Putar musik');
  button.setAttribute('aria-label',wanted?'Matikan musik latar':'Putar musik latar');
 }
 function play(){if(!backgroundPlayer)return;try{backgroundPlayer.setVolume(30);if(wanted&&!songPlaying)backgroundPlayer.playVideo();else backgroundPlayer.pauseVideo();}catch{}}
 function initialize(){
  if(!apiReady)return;
  if(started&&!backgroundPlayer){
   backgroundPlayer=new YT.Player('background-player',{
    videoId:BACKGROUND,width:320,height:200,
    playerVars:{autoplay:1,controls:1,playsinline:1,loop:1,playlist:BACKGROUND,rel:0,origin:location.origin},
    events:{onReady:play,onStateChange:e=>{
     if(e.data===YT.PlayerState.PLAYING){if(songPlaying||!wanted){e.target.pauseVideo();return;}update();note.textContent='Musik latar • volume lembut';}
     else if(e.data===YT.PlayerState.PAUSED&&!songPlaying&&wanted)update('Musik dijeda');
    },onAutoplayBlocked:()=>{wanted=false;update();note.textContent='Ketuk tombol Putar musik untuk memulai.';},
    onError:()=>{wanted=false;update('Buka musik');note.innerHTML='Video tidak dapat diputar di sini. <a href="https://www.youtube.com/watch?v='+BACKGROUND+'" target="_blank" rel="noopener">Buka di YouTube</a>.';}}
   });
  }
  document.querySelectorAll('iframe').forEach(frame=>{
   if(!frame.src.includes('/embed/'+SONG)||songPlayers.has(frame))return;
   const url=new URL(frame.src,location.href);
   url.protocol='https:';url.hostname='www.youtube.com';url.searchParams.set('start','60');url.searchParams.set('enablejsapi','1');url.searchParams.set('playsinline','1');url.searchParams.set('origin',location.origin);
   if(frame.src!==url.href)frame.src=url.href;
   frame.title='Our Song — mulai menit 1:00';frame.setAttribute('referrerpolicy','strict-origin-when-cross-origin');
   songPlayers.add(frame);
   new YT.Player(frame,{events:{onStateChange:e=>{
    songPlaying=e.data===YT.PlayerState.PLAYING||e.data===YT.PlayerState.BUFFERING;
    play();update();
   },onError:()=>{
    if(frame.parentElement.querySelector('.song-fallback'))return;
    const link=document.createElement('a');link.className='song-fallback';link.href='https://www.youtube.com/watch?v='+SONG+'&t=60s';link.target='_blank';link.rel='noopener';link.textContent='Putar di YouTube · mulai 1:00 ↗';
    frame.parentElement.append(link);
   }}});
  });
 }
 function start(){started=true;wanted=true;update('Memuat musik…');initialize();play();}
 function mount(){
  const widget=document.createElement('aside');widget.className='music-widget';widget.setAttribute('aria-label','Musik latar');
  widget.innerHTML='<div class="music-panel" hidden><div class="music-panel-header"><span>Lagu untuk menemani kamu</span><a href="https://www.youtube.com/watch?v='+BACKGROUND+'" target="_blank" rel="noopener">YouTube ↗</a></div><div id="background-player"></div><div class="music-note">Musik dimulai setelah ketukan pertama.</div></div><div class="music-controls"><button class="music-toggle" type="button" aria-pressed="false">'+icon+'<span>Putar musik</span></button><button class="music-expand" type="button" aria-label="Tampilkan pemutar musik" aria-expanded="false"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="3"/><path d="m10 9 5 3-5 3Z"/></svg></button></div>';
  document.body.append(widget);button=widget.querySelector('.music-toggle');label=button.querySelector('span');panel=widget.querySelector('.music-panel');note=widget.querySelector('.music-note');
  button.onclick=()=>{if(!started)start();else{wanted=!wanted;play();update();}};
  const expand=widget.querySelector('.music-expand');expand.onclick=()=>{panel.hidden=!panel.hidden;expand.setAttribute('aria-expanded',String(!panel.hidden));expand.setAttribute('aria-label',panel.hidden?'Tampilkan pemutar musik':'Sembunyikan pemutar musik');if(!started)start();};
  document.addEventListener('pointerdown',e=>{if(!started&&!e.target.closest('.music-widget'))start();},{capture:true});
  document.addEventListener('keydown',e=>{if(!started&&['Enter',' '].includes(e.key)&&!e.target.closest('.music-widget'))start();},{capture:true});
  const previous=window.onYouTubeIframeAPIReady;
  window.onYouTubeIframeAPIReady=()=>{if(previous)previous();apiReady=true;initialize();};
  if(window.YT?.Player){apiReady=true;initialize();}
  else{const script=document.createElement('script');script.src='https://www.youtube.com/iframe_api';script.async=true;document.head.append(script);}
  let queued=false;
  const observer=new MutationObserver(()=>{if(queued)return;queued=true;requestAnimationFrame(()=>{queued=false;initialize();});});
  observer.observe(document.body,{childList:true,subtree:true});
  let route=location.pathname;
  const routeChange=()=>{if(location.pathname===route)return;route=location.pathname;songPlaying=false;play();update();};
  for(const method of ['pushState','replaceState']){const original=history[method];history[method]=function(...args){const result=original.apply(this,args);requestAnimationFrame(routeChange);return result;};}
  addEventListener('popstate',routeChange);
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount,{once:true});else mount();
})();
