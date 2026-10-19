(globalThis["webpackChunk_canva_web"] = globalThis["webpackChunk_canva_web"] || []).push([[97668],{

/***/ 857683:
function(_, __, __webpack_require__) {__webpack_require__.n_x = __webpack_require__.n;const __web_req__ = __webpack_require__;__web_req__(944221);globalThis._5f74ec40302898c5a55451c9fbd04240 = globalThis._5f74ec40302898c5a55451c9fbd04240 || {};(function(__c) {var sRc=__webpack_require__(821364).EW;__c.YY=class{static G(a){__c.N(a,{step:sRc})}get kind(){return"point"}clone({rc:a=this.rc,zc:b=this.zc,kj:c=this.kj,$d:d=this.$d,inverse:e=this.inverse}){return new __c.YY({rc:a,zc:b,kj:c,$d:d,inverse:e})}snapshot(){const a=this.rc(),b=this.zc();return new __c.YY({rc:()=>a,zc:()=>b,kj:this.kj,$d:this.$d,inverse:this.inverse})}get(a){const b=this.rc();var c=b.indexOf(a);c=this.inverse?b.length-1-c:c;__c.u(c!==-1,`value ${a} must exist in domain`);const [d,e]=this.zc();a=b.length===1?.5:this.kj();return d+
(a*this.step+c*this.step)*Math.sign(e-d)}get step(){const a=this.rc().length+2*this.kj(),[b,c]=this.zc();return Math.abs(c-b)/Math.max(a-1,1)}US(a,b,c){__c.u(a.index!==b.index);const d=this.kj(),e=(b.center-a.center)/(b.index-a.index);return[a.center-(d+a.index)*e,b.center+(d+c-b.index-1)*e]}TS(a,b,c){const d=this.kj();return[b,a.center+(a.center-b)/(a.index+d)*(d+c-a.index-1)]}SS(a,b,c){const d=this.kj();return[a.center-(b-a.center)/(c-a.index-1+d)*(d+a.index),b]}constructor({rc:a,zc:b,kj:c,$d:d,
inverse:e=!1}){__c.YY.G(this);this.rc=a;this.zc=b;this.kj=c;this.$d=d;this.inverse=e}};
}).call(globalThis, globalThis._5f74ec40302898c5a55451c9fbd04240);}

}])
//# sourceMappingURL=sourcemaps/5ce38fdfb663fdfe.js.map