(this["webpackJsonpifs-passcode"]=this["webpackJsonpifs-passcode"]||[]).push([[0],{42:function(e,t,a){e.exports=a(55)},47:function(e,t,a){},50:function(e,t,a){},55:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),c=a(14),i=a.n(c),o=(a(47),a(27)),s=a(19),u=a(9),l=a.n(u),h=a(20),p=a(12),f=a(13),m=a(76),g=a(77),d=a(56),b=a(78),v=a(82),k=a(83),y=a(84),w=a(79),x=a(80),j=a(81),E=a(26);function O(e,t){e.beginPath(),t.forEach((function(t,a){var n=Object(f.a)(t,2),r=n[0],c=n[1];e[0===a?"moveTo":"lineTo"](r,c)})),e.stroke()}var F=a(32),S=a(33),C=function(){return new Worker(a.p+"static/js/blockhash.worker.307a72bc.worker.js")},I=new(function(){function e(){var t=this;Object(F.a)(this,e),this.map={},this.worker=new C,this.counter=0,this.worker.onmessage=function(e){var a=e.data,n=a.id,r=a.result;n&&t.map[n]?(t.map[n](r),delete t.map[n]):console.warn("Cannot find corresponding handler: ".concat(n,", ").concat(r))}}return Object(S.a)(e,[{key:"getHash",value:function(e,t,a){return this.newJob("hash",{data:e,bits:t,method:a})}},{key:"getDistance",value:function(e,t){return this.newJob("distance",{a:e,b:t})}},{key:"newJob",value:function(e,t){var a=this;return new Promise((function(n){var r=++a.counter;a.map[r]=n,a.worker.postMessage(Object(s.a)({id:r,job:e},t))}))}}]),e}()),M=function(e,t,a){return(e.r-t.r)*(e.r-t.r)+(e.g-t.g)*(e.g-t.g)+(e.b-t.b)*(e.b-t.b)<=a},W=function(e,t,a){if(t>e.width||a>e.height||t<0||a<0)throw new Error("Invalid point (".concat(t,",").concat(a,") in image (").concat(e.width,",").concat(e.height,")"));var n=4*(e.width*a+t);return{r:e.data[n],g:e.data[n+1],b:e.data[n+2],a:e.data[n+3]}},B=function(e,t,a,n){for(var r=arguments.length>4&&void 0!==arguments[4]?arguments[4]:0,c=arguments.length>5&&void 0!==arguments[5]?arguments[5]:e.width,i=r;i<c;++i){var o=W(e,i,t);if(!M(o,n,a))return!1}return!0},D=function(e,t,a,n){for(var r=arguments.length>4&&void 0!==arguments[4]?arguments[4]:0,c=arguments.length>5&&void 0!==arguments[5]?arguments[5]:e.height,i=r;i<c;++i){var o=W(e,t,i);if(!M(o,n,a))return!1}return!0};function J(e,t,a){return T.apply(this,arguments)}function T(){return(T=Object(p.a)(l.a.mark((function e(t,a,n){var r,c,i,o,s,u,h,p,f,m,g,d,b,v,k,y,w,x,j=arguments;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:for(r=j.length>3&&void 0!==j[3]?j[3]:800,c=j.length>4&&void 0!==j[4]&&j[4],i=t.getImageData(0,0,a,n),o=W(i,0,0),console.log("BgColor:",o),s=0,t.lineWidth=1,t.strokeStyle="#0FF",t.fillStyle="#0FF";++s<i.height&&B(i,s,r,o););for(;++s<i.height&&!B(i,s,r,o););for(;++s<i.height&&B(i,s,r,o););console.log("globalTop:",s),c&&(t.strokeStyle="#0FF",O(t,[[0,s-1],[i.width,s-1]])),u=0,h=0,p=[];case 17:if(!(u<i.width)){e.next=57;break}for(;u<i.width&&D(i,u,r,o,s);)++u;for(f=u;u<i.width&&!D(i,u,r,o,s);)++u;if(!(f>=(m=u))){e.next=24;break}return e.abrupt("break",57);case 24:g={top:s,left:f,right:m,bottom:i.height,images:[]},d=++h,console.log("Column #".concat(d,":"),f,m),c&&(t.strokeStyle="#0FF",O(t,[[f-1,s],[f-1,i.height]]),t.strokeStyle="#F0F",O(t,[[m,s],[m,i.height]])),b=s;case 29:if(!(b<i.height)){e.next=54;break}for(;b<i.height&&B(i,b,r,o,f,m);)++b;for(v=b;b<i.height&&!B(i,b,r,o,f,m);)++b;if(!(v>=(k=b))){e.next=36;break}return e.abrupt("break",54);case 36:for(y=f;y<m&&!D(i,y,r,o,v,k);)++y;return w=y,c&&(t.strokeStyle="#0FF",O(t,[[f,v-1],[m,v-1]]),t.strokeStyle="#F0F",O(t,[[f,k],[m,k]]),t.strokeStyle="#FF0",O(t,[[w,v],[w,k]])),console.log("Image: (".concat(f,",").concat(v,"),(").concat(w,",").concat(k,")")),x=t.getImageData(f,v,w-f,k-v),e.t0=g.images,e.t1=v,e.t2=f,e.t3=m,e.t4=k,e.next=49,I.getHash(x,16,2);case 49:e.t5=e.sent,e.t6={top:e.t1,left:e.t2,right:e.t3,bottom:e.t4,hash:e.t5},e.t0.push.call(e.t0,e.t6),e.next=29;break;case 54:p.push(g),e.next=17;break;case 57:return e.abrupt("return",p);case 58:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function L(e,t,a){var n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:0,r=arguments.length>4&&void 0!==arguments[4]?arguments[4]:0,c=e.filter((function(e){return e})),i=Math.max.apply(Math,Object(E.a)(c.map((function(e){return e.latE6})))),o=Math.min.apply(Math,Object(E.a)(c.map((function(e){return e.latE6})))),s=Math.min.apply(Math,Object(E.a)(c.map((function(e){return e.lngE6})))),u=Math.max.apply(Math,Object(E.a)(c.map((function(e){return e.lngE6})))),l=Math.min(a/(i-o),t/(u-s)),h=(u-s)*l,p=(i-o)*l;return c.map((function(e){var a=e.lngE6,c=e.latE6;return[n+(t-h)/2+(a-s)*l,r+(t-p)/2+(i-c)*l]}))}function P(e,t){return R.apply(this,arguments)}function R(){return(R=Object(p.a)(l.a.mark((function e(t,a){var n,r,c,i,o;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:n=1/0,r=-1,c=0;case 3:if(!(c<a.length)){e.next=14;break}if(i=a[c]){e.next=7;break}return e.abrupt("continue",11);case 7:return e.next=9,I.getDistance(i,t);case 9:(o=e.sent)<n&&(n=o,r=c);case 11:++c,e.next=3;break;case 14:return e.abrupt("return",r);case 15:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var A=function(e){return e.files&&e.files.length?Array.from(e.files):[]};function N(e,t){return new Promise((function(a,n){var r=new FileReader;r.onload=function(){a(r.result)},r.onerror=n,r[t](e)}))}function z(){return(z=Object(p.a)(l.a.mark((function e(t){var a,n,r,c;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:a=Object(h.a)(A(t)),e.prev=1,a.s();case 3:if((n=a.n()).done){e.next=14;break}if((r=n.value).type.startsWith("image/")){e.next=7;break}return e.abrupt("continue",12);case 7:return c=new Image,e.next=10,N(r,"readAsDataURL");case 10:return c.src=e.sent,e.abrupt("return",c);case 12:e.next=3;break;case 14:e.next=19;break;case 16:e.prev=16,e.t0=e.catch(1),a.e(e.t0);case 19:return e.prev=19,a.f(),e.finish(19);case 22:return e.abrupt("return",null);case 23:case"end":return e.stop()}}),e,null,[[1,16,19,22]])})))).apply(this,arguments)}var H=a(34);a(50);var U=function(){var e=Object(n.useRef)(null),t=Object(n.useState)({threshold:800,lineWidth:5,debugging:!1}),a=Object(f.a)(t,2),c=a[0],i=a[1],u=Object(n.useState)([]),E=Object(f.a)(u,2),F=E[0],S=E[1],C=Object(n.useState)(null),I=Object(f.a)(C,2),M=I[0],W=I[1],B=Object(n.useState)(!1),D=Object(f.a)(B,2),T=D[0],R=D[1],U=Object(n.useState)(!1),Y=Object(f.a)(U,2),q=Y[0],G=Y[1],K=Object(n.useCallback)(Object(p.a)(l.a.mark((function t(){var a,n,r,i,o,s;return l.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(a=e.current,M&&a){t.next=3;break}return t.abrupt("return");case 3:if(a.width=M.width,a.height=M.height,n=a.getContext("2d")){t.next=8;break}return t.abrupt("return");case 8:return n.drawImage(M,0,0),t.next=11,new Promise((function(e){return setTimeout(e,100)}));case 11:return t.next=13,J(n,M.width,M.height,c.threshold,c.debugging);case 13:r=t.sent,i=Object(h.a)(r),t.prev=15,s=l.a.mark((function e(){var t,a,r,i,s;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=o.value,a=F.map((function(e){return e.hash})),e.next=4,Promise.all(t.images.map(function(){var e=Object(p.a)(l.a.mark((function e(t){var n,r;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.hash,e.next=3,P(n,a);case 3:return r=e.sent,e.abrupt("return",F[r]);case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()));case 4:r=e.sent,i=t.right-t.left-40,s=L(r,i,i,t.left+20,t.bottom-i-50),n.lineWidth=c.lineWidth,n.strokeStyle="#fff",O(n,s);case 10:case"end":return e.stop()}}),e)})),i.s();case 18:if((o=i.n()).done){t.next=22;break}return t.delegateYield(s(),"t0",20);case 20:t.next=18;break;case 22:t.next=27;break;case 24:t.prev=24,t.t1=t.catch(15),i.e(t.t1);case 27:return t.prev=27,i.f(),t.finish(27);case 30:case"end":return t.stop()}}),t,null,[[15,24,27,30]])}))),[c,M,F]),Q=function(e){var t=e.target;i(Object(s.a)(Object(s.a)({},c),{},Object(o.a)({},t.name,"radio"===t.type||"checkbox"===t.type?t.checked:t.value)))},V={disabled:T,style:{width:"100%"}},X=function(){var e=Object(p.a)(l.a.mark((function e(t){var a,n,r,c;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:a=Object(h.a)(A(t)),e.prev=1,a.s();case 3:if((n=a.n()).done){e.next=17;break}return r=n.value,e.prev=5,e.next=8,N(r,"readAsText");case 8:return c=e.sent,S(JSON.parse(c)),e.abrupt("return");case 13:e.prev=13,e.t0=e.catch(5);case 15:e.next=3;break;case 17:e.next=22;break;case 19:e.prev=19,e.t1=e.catch(1),a.e(e.t1);case 22:return e.prev=22,a.f(),e.finish(22);case 25:case"end":return e.stop()}}),e,null,[[1,19,22,25],[5,13]])})));return function(t){return e.apply(this,arguments)}}();return r.a.createElement(r.a.Fragment,null,r.a.createElement(m.a,{className:"App"},r.a.createElement("h3",null,"IFS Passcode Challenge Solver"),r.a.createElement(g.a,{container:!0,justify:"space-between",spacing:3},r.a.createElement(g.a,{item:!0,xs:!0},r.a.createElement(d.a,{variant:"caption",display:"block",gutterBottom:!0},"Data File"),r.a.createElement("input",{accept:"application/json",style:{display:"none"},id:"json-file",type:"file",onChange:function(e){return X(e.target)}}),r.a.createElement("label",{htmlFor:"json-file"},r.a.createElement(b.a,{variant:"contained",component:"span",color:F.length?"default":"secondary"},"Select")),F.length>0?r.a.createElement("span",{style:{marginLeft:10}},"Loaded ",F.length," portal(s)"):null),r.a.createElement(g.a,{item:!0,xs:!0},r.a.createElement(d.a,{variant:"caption",display:"block",gutterBottom:!0},"Image"),r.a.createElement("input",{accept:"image/jpeg,image/png",style:{display:"none"},id:"image-file",type:"file",onChange:function(e){return function(e){return z.apply(this,arguments)}(e.target).then((function(e){return e&&W(e)}))}}),r.a.createElement("label",{htmlFor:"image-file"},r.a.createElement(b.a,{variant:"contained",component:"span",color:M?"default":"secondary"},"Select")),M?r.a.createElement("span",{style:{marginLeft:10}},"Image Loaded"):null),r.a.createElement(g.a,{item:!0,xs:12,md:1},r.a.createElement(d.a,{variant:"caption",display:"block",gutterBottom:!0},"Line Width"),r.a.createElement(v.a,Object.assign({name:"lineWidth",type:"number",value:c.lineWidth,onChange:Q},V))),r.a.createElement(g.a,{item:!0,xs:12,md:1},r.a.createElement(d.a,{variant:"caption",display:"block",gutterBottom:!0},"Threshold"),r.a.createElement(v.a,Object.assign({name:"threshold",type:"number",value:c.threshold,onChange:Q},V))),r.a.createElement(g.a,{item:!0,xs:12,md:1},r.a.createElement(d.a,{variant:"caption",display:"block",gutterBottom:!0},"Debugging"),r.a.createElement(k.a,{checked:c.debugging,onChange:Q,name:"debugging"}))),r.a.createElement(y.a,{style:{marginTop:10,marginBottom:10}},r.a.createElement(w.a,null,"Need examples? We have one from Jianggan, Hangzhou:\xa0",r.a.createElement(x.a,{href:"/demo/jianggan-hangzhou/portals.json",download:!0},"Data"),",\xa0",r.a.createElement(x.a,{href:"/demo/jianggan-hangzhou/2020-09.jpg",download:!0},"Image"))),r.a.createElement("div",{className:"buttons"},r.a.createElement(b.a,{variant:"contained",color:"primary",disabled:!F.length||!M||T,onClick:function(){T||(R(!0),K().then((function(){return G(!0)})).catch((function(){})).then((function(){return R(!1)})))},style:{marginRight:10}},"Run"),r.a.createElement(b.a,{variant:"contained",color:"secondary",disabled:!q,onClick:function(){var t=e.current;M&&t&&t.toBlob((function(e){return e&&Object(H.saveAs)(e)}))},style:{marginRight:10}},"Save"),T?r.a.createElement(j.a,{size:24}):null),r.a.createElement("div",{className:"canvas"},r.a.createElement("canvas",{ref:e}))))};i.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(U,null)),document.getElementById("root"))}},[[42,1,2]]]);
//# sourceMappingURL=main.850118b6.chunk.js.map