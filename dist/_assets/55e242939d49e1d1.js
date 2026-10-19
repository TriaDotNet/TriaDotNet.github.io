(globalThis["webpackChunk_canva_web"] = globalThis["webpackChunk_canva_web"] || []).push([[77828],{

/***/ 129997:
function(_, __, __webpack_require__) {__webpack_require__.n_x = __webpack_require__.n;const __web_req__ = __webpack_require__;__web_req__(944221);__web_req__(932417);globalThis._5f74ec40302898c5a55451c9fbd04240 = globalThis._5f74ec40302898c5a55451c9fbd04240 || {};(function(__c) {var p0c=async function(a,b,c){const d=o0c()();try{const e=__c.y(a.wj.context),f=d.r(await d.s(a.fetch(b.url,{signal:c}))),g=d.r(await d.s(f.arrayBuffer()));return e.decodeAudioData(g)}finally{d.s()}},r0c=function(a,b,c,d){if(d){var e=a.cache.get(b);e||(e={buffer:c,L2:new Set},c.catch(q0c.wrap(()=>{a.cache.delete(b)})),a.cache.set(b,e));e.L2.add(d);d.addEventListener("abort",()=>{e?.L2.delete(d);e&&e.L2.size===0&&a.cache.delete(b);e=void 0},{once:!0})}},q0c=__webpack_require__(815703).F;var o0c=__webpack_require__(929846)._;var s0c;
s0c=class{async zc(a,b,c){const d=o0c()();try{__c.u(b.aa>=0&&b.L>=0);const m=__c.ur(this.ik,a);if(m){var e=this.cache.get(a)?.buffer||p0c(this,m,c);r0c(this,a,e,c);var f=d.r(await d.s(e)),g=b.L-f.duration*1E6;if(b.aa===0&&(g>=0||Math.abs(g)<=100))return f;var h=b.L/1E6*f.sampleRate;if(h<=0)return f;var k=new AudioBuffer({length:h,numberOfChannels:f.numberOfChannels,sampleRate:f.sampleRate}),l=Math.floor(f.sampleRate*b.aa/1E6);for(a=0;a<f.numberOfChannels;a++){const n=f.getChannelData(a).subarray(l,l+
h);k.copyToChannel(n,a)}return k}}finally{d.s()}}constructor(a,b,c=__c.IVc){this.wj=a;this.ik=b;this.fetch=c;this.cache=new Map}};__c.NDa={};__c.NDa.TIb=s0c;
}).call(globalThis, globalThis._5f74ec40302898c5a55451c9fbd04240);}

}])
//# sourceMappingURL=sourcemaps/55e242939d49e1d1.js.map