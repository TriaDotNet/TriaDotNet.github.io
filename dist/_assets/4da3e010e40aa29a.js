(globalThis["webpackChunk_canva_web"] = globalThis["webpackChunk_canva_web"] || []).push([[37329],{

/***/ 7480:
function(_, __, __webpack_require__) {__webpack_require__.n_x = __webpack_require__.n;const __web_req__ = __webpack_require__;__web_req__(944221);globalThis._5f74ec40302898c5a55451c9fbd04240 = globalThis._5f74ec40302898c5a55451c9fbd04240 || {};(function(__c) {var u=__c.u;var MFd,OFd,NFd,X7;MFd=function(a){return(Math.ceil(Math.sqrt(Math.max(1,Math.ceil(a/2))*4)/2)*2)**2};
OFd=function(a,b){const c=Math.ceil(b/1E6*200),d=Math.ceil(Math.ceil(b/1E6*a.sampleRate)/c),e=Array.from({length:a.numberOfChannels},(g,h)=>{g=Math.floor(0*a.sampleRate);const k=Math.min(Math.floor((0+b)/1E6*a.sampleRate),a.length);return a.getChannelData(h).subarray(g,k)}),f=new Float32Array(MFd(c));for(let g=0;g<c;g++){const h=NFd(e,g,d),k=g*2;f[k]=h.max;f[k+1]=h.min}return{buffer:f,w3:c}};
NFd=function(a,b,c){var d=Math.floor(b*c);b=Math.min(Math.floor((b+1)*c),a[0].length,d+500);c=Infinity;let e=-Infinity;for(;d<b;d++){let f=0;for(let g=0;g<a.length;++g)f+=a[g][d];c=Math.min(c,f);e=Math.max(e,f)}return{min:isFinite(c)?c/a.length:0,max:isFinite(e)?e/a.length:0}};
X7=class{static cYb(a){u(!0);u(!0);u(!0);const b=a.duration*1E6;u(a.duration*1E6>=b,"Duration of {}s exceeds audio length of {}s",b/1E6,a.duration);const {buffer:c,w3:d}=OFd(a,b);return new X7(c,0,d,200)}trim(a,b){u(a>=0&&b>=0);a=Math.floor(a/1E6*this.qea);return new X7(this.buffer,this.Bxa+a,Math.min(Math.ceil(b/1E6*this.qea),this.w3-a),this.qea)}split(a){u(a>0);if(a<=1)return[this];const b=Math.ceil(this.w3/a);return Array.from({length:Math.ceil(a)},(c,d)=>{c=this.Bxa+d*b;return new X7(this.buffer,
c,Math.min(c+b,this.Bxa+this.w3)-c,this.qea)})}repeat(a){u(a>0);if(a<=1)return this;const b=this.w3*a,c=new Float32Array(MFd(b));var d=this.Bxa*2;d=this.buffer.subarray(d,d+this.w3*2);for(let e=0;e<a;e++)c.set(d,e*d.length);return new X7(c,0,b,this.qea)}constructor(a,b,c,d){this.buffer=a;this.Bxa=b;this.w3=c;this.qea=d;u(c*2<=a.length)}};__c.GDa={};__c.GDa.CKb=X7;
}).call(globalThis, globalThis._5f74ec40302898c5a55451c9fbd04240);}

}])
//# sourceMappingURL=sourcemaps/4da3e010e40aa29a.js.map