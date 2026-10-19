(globalThis["webpackChunk_canva_web"] = globalThis["webpackChunk_canva_web"] || []).push([[59427],{

/***/ 67270:
function(_, __, __webpack_require__) {__webpack_require__.n_x = __webpack_require__.n;const __web_req__ = __webpack_require__;__web_req__(944221);__web_req__(933608);globalThis._5f74ec40302898c5a55451c9fbd04240 = globalThis._5f74ec40302898c5a55451c9fbd04240 || {};(function(__c) {var wOc,xOc;wOc=function(a,b,c){return __c.y(a.ei).f$(b,c)};xOc=function(a,b){if(a===""||b.length===0)return[];const c=[];let d=0;for(const e of b)b=a.slice(d,d+e),c.push(b),d+=e;return c};
__c.$X=class{Lf({store:a,text:b,nb:c,textAlign:d,constraint:e}){var f=__c.tOc(a,b);a={fontSize:a.fontSize,fontFamily:a.yh,fontWeight:a.fontWeight,textAlign:d,textBaseline:"alphabetic"};if(c==null||b!==""&&c.length===0){switch(e.type){case "size":c=e.maxWidth;break;case "aspectRatio":c=this.Wa.measureText({text:b,...a});if(c.width/c.height<=e.Cpb)return{lines:[b],Lf:[c],lineHeight:c.fontBoundingBoxAscent+c.fontBoundingBoxDescent};c=Math.sqrt(c.width*c.height*e.RCb);break;default:throw new __c.z(e);
}c=wOc(this,f,c)}f=c.length;if(f===0)return{lines:[],Lf:[],lineHeight:0};b=f>1?xOc(b,c):[b];c=b.map(l=>l.trimEnd());d=this.Wa.vk({Zs:c,...a});const g=d[0].fontBoundingBoxAscent+d[0].fontBoundingBoxDescent;if(e.type!=="size"||e.maxHeight==null||f===1||g*f<=e.maxHeight)return{lines:c,Lf:d,lineHeight:g};f=Math.max(0,Math.floor(e.maxHeight/g)-1);const {text:h,...k}=this.Wa.tg({text:`${b[f]}${c[f+1]}`,...a,maxWidth:e.maxWidth});return{lines:[...c.slice(0,f),h],Lf:[...d.slice(0,f),k],lineHeight:g}}constructor(a,
b){this.Wa=a;this.ei=b}};
}).call(globalThis, globalThis._5f74ec40302898c5a55451c9fbd04240);}

}])
//# sourceMappingURL=sourcemaps/bf6a07fb16ca1653.js.map