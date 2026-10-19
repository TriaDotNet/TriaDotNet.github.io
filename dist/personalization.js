(() => {
 'use strict';
 const BACKGROUND='iOQEJUw2NlE', BACKGROUND_START=28, BACKGROUND_FILE='/_assets/personal/background.mp3';
 const SONG='D-VytLhH-KE', SONG_START=18, SONG_FILE='/_assets/personal/bersamamu.mp3';
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
 const exists=url=>fetch(url,{method:'HEAD'}).then(r=>r.ok,()=>false);
 const onSongPage=()=>location.pathname.replace(/\/$/,'')==='/our-song';
 const fmt=t=>{t=Math.max(0,Math.floor(t||0));return Math.floor(t/60)+':'+String(t%60).padStart(2,'0');};
 // Music has no on/off control: it starts on load, or on the first tap if the
 // browser blocks sound until then (started is reset so that tap retries).
 let apiReady=false, started=false;

 // ── Background music: local file when present, otherwise a hidden YouTube player ──
 let bgSource, bgAudio, bgPlayer;
 // Background plays everywhere except the Our Song page.
 function play(){
  const on=started&&!onSongPage();
  if(bgAudio){if(on)bgAudio.play().catch(()=>{started=false;});else bgAudio.pause();}
  else if(bgPlayer){try{bgPlayer.setVolume(30);if(on)bgPlayer.playVideo();else bgPlayer.pauseVideo();}catch{}}
 }
 async function startBackground(){
  if(!bgSource)bgSource=await exists(BACKGROUND_FILE)?'file':'youtube';
  if(bgSource==='file'){
   if(!bgAudio){bgAudio=new Audio(BACKGROUND_FILE);bgAudio.loop=true;bgAudio.volume=.3;bgAudio.currentTime=BACKGROUND_START;}
   play();
  }else initialize();
 }
 function initialize(){
  if(!apiReady)return;
  if(started&&bgSource==='youtube'&&!bgPlayer){
   bgPlayer=new YT.Player('background-player',{
    videoId:BACKGROUND,width:320,height:200,
    playerVars:{autoplay:1,start:BACKGROUND_START,controls:0,playsinline:1,loop:1,playlist:BACKGROUND,rel:0,origin:location.origin},
    events:{onReady:e=>{e.target.seekTo(BACKGROUND_START,true);play();},onStateChange:e=>{
     if(e.data===YT.PlayerState.PLAYING&&onSongPage())e.target.pauseVideo();
    },onAutoplayBlocked:()=>{started=false;}}
   });
  }
 }

 // ── Our Song: custom player card replaces the page's YouTube box ──
 let songAudio, songCard, songWanted=false;
 const songFrames=new WeakSet();
 const playIcon='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m8 5 12 7-12 7Z" fill="currentColor"/></svg>';
 const pauseIcon='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 5h4v14H7zm6 0h4v14h-4z" fill="currentColor"/></svg>';
 function attachSongCard(){
  document.querySelectorAll('iframe').forEach(frame=>{
   if(!frame.src.includes('/embed/'+SONG)||songFrames.has(frame))return;
   songFrames.add(frame);frame.src='about:blank';
   const host=frame.parentElement;host.classList.add('song-host');
   if(!songCard){
    songCard=document.createElement('div');songCard.className='song-card';
    songCard.innerHTML='<img class="song-card-cover" src="/_assets/personal/song-cover.png" alt="Sampul lagu: foto kita berdua"><div class="song-card-body"><span class="song-card-kicker">our song ♡</span><strong class="song-card-title">Bersamamu</strong><span class="song-card-artist">Jaz</span><div class="song-card-controls"><button class="song-card-toggle" type="button" aria-label="Putar lagu">'+playIcon+'</button><div class="song-card-progress" role="slider" tabindex="0" aria-label="Posisi lagu" aria-valuemin="0" aria-valuemax="0" aria-valuenow="0"><span class="song-card-bar"></span></div><span class="song-card-time">0:00</span></div></div>';
    songCard.querySelector('.song-card-toggle').onclick=()=>{if(songAudio&&!songAudio.paused){songWanted=false;songAudio.pause();}else playSong(false);};
    const bar=songCard.querySelector('.song-card-progress');
    const seek=x=>{if(!songAudio||!songAudio.duration)return;const r=bar.getBoundingClientRect();songAudio.currentTime=Math.min(1,Math.max(0,(x-r.left)/r.width))*songAudio.duration;};
    bar.addEventListener('pointerdown',e=>seek(e.clientX));
    bar.addEventListener('keydown',e=>{if(!songAudio)return;if(e.key==='ArrowRight')songAudio.currentTime+=5;else if(e.key==='ArrowLeft')songAudio.currentTime-=5;});
   }
   host.append(songCard);renderSong();
  });
 }
 function renderSong(){
  if(!songCard)return;
  const playing=songAudio&&!songAudio.paused, d=songAudio?.duration||0, t=songAudio?.currentTime||0;
  const toggle=songCard.querySelector('.song-card-toggle');
  toggle.innerHTML=playing?pauseIcon:playIcon;toggle.setAttribute('aria-label',playing?'Jeda lagu':'Putar lagu');
  songCard.classList.toggle('is-playing',!!playing);
  songCard.querySelector('.song-card-bar').style.width=(d?t/d*100:0)+'%';
  songCard.querySelector('.song-card-time').textContent=fmt(t)+(d?' / '+fmt(d):'');
  const bar=songCard.querySelector('.song-card-progress');bar.setAttribute('aria-valuemax',String(Math.floor(d)));bar.setAttribute('aria-valuenow',String(Math.floor(t)));bar.setAttribute('aria-valuetext',fmt(t));
 }
 // fromStart: jump to SONG_START (on entering the page); otherwise resume.
 function playSong(fromStart=true){
  songWanted=true;
  if(!songAudio){
   songAudio=new Audio(SONG_FILE);songAudio.preload='auto';
   for(const ev of ['play','pause','timeupdate','loadedmetadata','ended'])songAudio.addEventListener(ev,renderSong);
   fromStart=true;
  }
  if(fromStart||songAudio.ended)songAudio.currentTime=SONG_START;
  songAudio.play().catch(()=>{});
  play();
 }
 function stopSong(){songWanted=false;songAudio?.pause();play();}

 // resumeSong=false when the first tap is on the song card itself (its button handles playback).
 function start(resumeSong=true){started=true;startBackground();if(resumeSong&&onSongPage()&&songWanted&&(!songAudio||songAudio.paused))playSong();}
 function mount(){
  // hidden host for the YouTube fallback player only
  const host=document.createElement('div');host.className='music-host';host.setAttribute('aria-hidden','true');host.innerHTML='<div id="background-player"></div>';
  document.body.append(host);
  document.addEventListener('pointerdown',e=>{if(!started)start(!e.target.closest('.song-card'));},{capture:true});
  document.addEventListener('keydown',()=>{if(!started)start();},{capture:true});
  const previous=window.onYouTubeIframeAPIReady;
  window.onYouTubeIframeAPIReady=()=>{if(previous)previous();apiReady=true;initialize();};
  if(window.YT?.Player){apiReady=true;initialize();}
  else{const script=document.createElement('script');script.src='https://www.youtube.com/iframe_api';script.async=true;document.head.append(script);}
  let queued=false;
  const observer=new MutationObserver(()=>{if(queued)return;queued=true;requestAnimationFrame(()=>{queued=false;attachSongCard();});});
  observer.observe(document.body,{childList:true,subtree:true});
  let route=location.pathname;
  const routeChange=()=>{if(location.pathname===route)return;route=location.pathname;if(onSongPage())playSong();else stopSong();window.BirthdayLetter?.refresh();};
  for(const method of ['pushState','replaceState']){const original=history[method];history[method]=function(...args){const result=original.apply(this,args);requestAnimationFrame(routeChange);return result;};}
  addEventListener('popstate',routeChange);
  attachSongCard();
  if(onSongPage())playSong();
  start(); // try right away; if sound is blocked, the first tap starts it
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount,{once:true});else mount();
})();
