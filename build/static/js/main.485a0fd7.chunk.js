(this.webpackJsonptrf_web=this.webpackJsonptrf_web||[]).push([[0],{144:function(e,t,a){"use strict";a.r(t);var n=a(32),r=a(0),o=a.n(r),c=a(24),l=a.n(c),i=a(7),s=a(20),u=(a(83),a(15)),d=a.n(u),m=a(26),p=a(27),b=a(28),g=a(29),f=a(31),h={dev:{contract:"wigglewiggle",host:"jungle2.cryptolions.io",chainId:"e70aaab8997e1dfce58fbfac80cbbb8fecec7b99cf982a9444273cbc64c41473"},live:{contract:"travelrefund",host:"eos.greymass.com",chainId:"aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906"}},v=Object(f.a)({appName:"trf-web",network:{host:h.live.host,port:443,protocol:"https",chainId:h.live.chainId},walletProviders:[Object(p.a)(),Object(b.a)(),Object(g.a)()]}),E=v.getWalletProviders(),y={scatter:E[0],tp:E[1],lynx:E[2]},w=function(e){var t=Object(i.b)(),a=function(e,a){if(e.message){var n={code:e.code,message:e.message,stage:a};t({type:"error",payload:n})}else{t({type:"error",payload:{code:"generic",message:e,stage:a}})}return null},n=function(){var e=Object(m.a)(d.a.mark((function e(n){var r,o,c,l,i,s,u,m;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=y[n],o=v.initWallet(r),t({type:"switch",payload:"Wallet initialized..."}),null,e.prev=4,e.next=7,o.connect();case 7:e.sent,e.next=13;break;case 10:return e.prev=10,e.t0=e.catch(4),e.abrupt("return",a(e.t0,"discovering"));case 13:return t({type:"switch",payload:"Connected..."}),c=null,e.prev=15,e.next=18,o.discover({pathIndexList:[0,1,2,3]});case 18:c=e.sent,e.next=24;break;case 21:return e.prev=21,e.t1=e.catch(15),e.abrupt("return",a(e.t1,"discovering"));case 24:if(c&&c.keyToAccountMap){e.next=26;break}return e.abrupt("return",a("No data","keyToAccountMap"));case 26:if(l=null,!(c.keyToAccountMap.length>0)){e.next=45;break}return t({type:"switch",payload:"Discovery complete..."}),0,i=c.keyToAccountMap[0],console.log("discovering, keyObj",i),s=i.accounts[0].account,u=i.accounts[0].authorization,e.prev=34,e.next=37,o.login(s,u);case 37:l=e.sent,e.next=43;break;case 40:return e.prev=40,e.t2=e.catch(34),e.abrupt("return",a(e.t2,"logging in after discovering"));case 43:e.next=55;break;case 45:return t({type:"switch",payload:"Logging in..."}),e.prev=46,e.next=49,o.login();case 49:l=e.sent,e.next=55;break;case 52:return e.prev=52,e.t3=e.catch(46),e.abrupt("return",a(e.t3,"logging in"));case 55:if(l){e.next=57;break}return e.abrupt("return",a("Not logged in","verifying account info entered"));case 57:return m=o.auth.accountName,t({type:"switch",payload:"Submitting to blockchain..."}),e.prev=59,e.next=62,o.eosApi.transact({actions:[{account:h.live.contract,name:"create",authorization:[{actor:m,permission:"active"}],data:{user:m}}]},{broadcast:!0,blocksBehind:3,expireSeconds:100});case 62:e.sent,e.next=68;break;case 65:return e.prev=65,e.t4=e.catch(59),e.abrupt("return",a("Make sure you press confirm","submitting"));case 68:t({type:"switch",payload:"done"});case 69:case"end":return e.stop()}}),e,null,[[4,10],[15,21],[34,40],[46,52],[59,65]])})));return function(t){return e.apply(this,arguments)}}(),r=e.walletType,c=e.walletName;return o.a.createElement("button",{className:"button",onClick:function(){n(r)}},"APPLY USING ",c)},O=null;O=navigator.userAgent.match(/Android|iPhone|iPad|iPod/i)?"mobile":"computer";navigator.userAgent.match(/iPhone|iPad|iPod/i)||navigator.userAgent.match(/Android/i);var x=null;navigator.userAgent.includes("TokenPocket")?x="tp":navigator.userAgent.includes("EOSLynx")&&(x="lynx");var k=null;"mobile"==O&&null==x?k=o.a.createElement("a",{className:"button",href:'tpdapp://open?params={"url": "http://trf.eosdetroit.io", "chain": "EOS", "source":"trf"}'},"LOGIN WITH TOKENPOCKET"):"computer"==O&&null==x?k=o.a.createElement(w,{walletType:"scatter",walletName:"SCATTER"}):"mobile"==O&&"tp"==x?k=o.a.createElement(w,{walletType:"tp",walletName:"TOKENPOCKET"}):"mobile"==O&&"lynx"==x&&(k=o.a.createElement(w,{walletType:"lynx",walletName:"LYNX"}));var j=function(){var e=Object(i.c)((function(e){return e.status})),t=Object(i.c)((function(e){return e.error})),a=Object(i.b)();return"home"==e?o.a.createElement(o.a.Fragment,null,o.a.createElement("div",null,o.a.createElement("div",{className:"hideOnDesktop",style:{textAlign:"center",paddingBottom:40}},o.a.createElement("img",{src:"/img/rio_mobile.jpg"})),o.a.createElement("h1",null,"What is the Travel Reimbursement Fund?"),o.a.createElement("p",null,"The Travel Reimbursement Fund is an initiative to make EOSIO community events inclusive, rolled out for the 2019 EOS Community Conference in Rio de Janeiro."),o.a.createElement("p",null,"By providing a pro-rata travel stipend to attendees, together we can subsidize the costs of travel for our EOSIO community."),o.a.createElement("p",null,"All attendees are welcome to opt-in! A warm thanks goes out to the generous donors who made this possible:"),o.a.createElement("div",{className:"donors",style:{}},o.a.createElement("a",{className:"donors--a",target:"_blank",href:"https://eosrio.io"},"EOS Rio"),o.a.createElement("a",{className:"donors--a",target:"_blank",href:"https://eoslaomao.com"},"EOS LaoMao"),o.a.createElement("a",{className:"donors--a",target:"_blank",href:""},"EOS BP Legal Fund Donors"),o.a.createElement("a",{className:"donors--a",target:"_blank",href:"https://eosdetroit.io"},"EOS Detroit")),o.a.createElement("h2",null,"Applying"),o.a.createElement("p",null,"Just login with your EOS username, then bring your travel info (a flight email or home address) and show it to Robrigo at the event.")),o.a.createElement("div",{style:{paddingTop:20}},k)):"done"==e?o.a.createElement(o.a.Fragment,null,o.a.createElement("div",null,o.a.createElement("p",null,"Success! Now find this Rob guy, and show him your travel info. "),o.a.createElement("p",null,"(A flight email, or something that has your home town on it.)")),o.a.createElement("div",{style:{textAlign:"center"}},o.a.createElement("img",{src:"/img/rob.jpg"}))):"already_signed_up"==e?o.a.createElement(o.a.Fragment,null,o.a.createElement("div",null,"You're already signed up. Now you just need to find this Robrigo guy, and hand him your travel info."),o.a.createElement("div",null,o.a.createElement("img",{src:"/img/rob.jpg"}))):"error"==e?o.a.createElement(o.a.Fragment,null,o.a.createElement("h1",null,"Something Went Awry"),o.a.createElement("p",null,"Failed while ",t.stage),o.a.createElement("p",null,t.message),o.a.createElement("div",{style:{paddingTop:20}},o.a.createElement("p",null,"Try again?"),k),o.a.createElement("button",{className:"button",onClick:function(){a({type:"switch",payload:"home"})}},"Back")):o.a.createElement((function(){var e=Object(i.c)((function(e){return e.status}));Object(i.b)();return o.a.createElement("div",{style:{textAlign:"center",padding:20}},e)}),null)},N=a(8),S={dev:{contract:"wigglewiggle",host:"jungle2.cryptolions.io",chainId:"e70aaab8997e1dfce58fbfac80cbbb8fecec7b99cf982a9444273cbc64c41473"},live:{contract:"travelrefund",host:"eos.greymass.com",chainId:"aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906"}},T=null;T=window.TPJSBrigeClient?"TokenPocket":navigator.userAgent.includes("EOSLynx")?"EOS Lynx":navigator.userAgent.match(/Android|iPhone|iPad|iPod/i)?"mobile_browser":"desktop_browser";var A,I=new XMLHttpRequest,_=Object(f.a)({appName:"trf-web",network:{host:S.live.host,port:443,protocol:"https",chainId:S.live.chainId},walletProviders:[Object(p.a)(),Object(b.a)(),Object(g.a)()]}),M=_.getWalletProviders(),P=-22.9110137,C=-43.2093727,R=function(){var e=Object(r.useState)(null),t=Object(N.a)(e,2),a=t[0],n=(t[1],Object(r.useState)(!1)),c=Object(N.a)(n,2),l=c[0],i=c[1],s=Object(r.useState)([]),u=Object(N.a)(s,2),p=u[0],b=u[1],g=Object(r.useState)([]),f=Object(N.a)(g,2),h=f[0],v=f[1],E=Object(r.useState)(null),y=Object(N.a)(E,2),w=y[0],O=y[1],x=Object(r.useState)(null),k=Object(N.a)(x,2),j=k[0],A=k[1],R=Object(r.useState)([]),L=Object(N.a)(R,2),F=L[0],B=L[1],D=Object(r.useState)(null),z=Object(N.a)(D,2),W=z[0],J=z[1],U=Object(r.useState)(null),q=Object(N.a)(U,2),G=q[0],H=q[1],K=function(){var e=Object(m.a)(d.a.mark((function e(t,a){var n,r,o,c,l,i,s,u;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,n=M[t],r=_.initWallet(n),e.next=5,r.connect();case 5:return e.sent,e.next=8,r.discover({pathIndexList:[0,1,2,3]});case 8:if(o=e.sent,c=null,!(o.keyToAccountMap.length>0)){e.next=18;break}0,l=o.keyToAccountMap[0],i=l.accounts[0].account,s=l.accounts[0].authorization,c=r.login(i,s),e.next=21;break;case 18:return e.next=20,r.login();case 20:c=e.sent;case 21:if(c){e.next=23;break}throw Error("Not logged in");case 23:return u=r.auth.accountName,console.log(r.eosApi),e.next=27,r.eosApi.transact({actions:[{account:S.live.contract,name:a,authorization:[{actor:u,permission:"active"}],data:{user:w,distance:G}}]},{broadcast:!0,blocksBehind:3,expireSeconds:100});case 27:e.sent,window.alert("Done!"),O(null),J(null),H(null),B([]),b([]),e.next=40;break;case 36:e.prev=36,e.t0=e.catch(0),alert(e.t0),console.log("error",e.t0);case 40:case"end":return e.stop()}}),e,null,[[0,36]])})));return function(t,a){return e.apply(this,arguments)}}();if(Object(r.useEffect)((function(){clearTimeout(setTimeout),setTimeout((function(){j&&(I.onreadystatechange=function(){if(4==I.readyState&&200==I.status){var e=JSON.parse(I.responseText);console.log(e.features),B(e.features)}},I.open("GET","https://api.opencagedata.com/geocode/v1/geojson?q="+encodeURIComponent(j)+"&key=457712e7eb8a4316a4580bcbb41828aa&language=en&pretty=1&no_annotations=1"),I.send())}),300)}),[j]),Object(r.useEffect)((function(){if(W){var e=W.geometry.coordinates;H(function(e,t,a,n,r){if(e==a&&t==n)return 0;var o=Math.PI*e/180,c=Math.PI*a/180,l=t-n,i=Math.PI*l/180,s=Math.sin(o)*Math.sin(c)+Math.cos(o)*Math.cos(c)*Math.cos(i);return s>1&&(s=1),s=60*(s=180*(s=Math.acos(s))/Math.PI)*1.1515,"K"==r&&(s*=1.609344),"N"==r&&(s*=.8684),Math.round(s)}(P,C,e[1],e[0]))}}),[W]),Object(r.useEffect)((function(){if(!l){var e=new XMLHttpRequest;e.onreadystatechange=function(){if(4==e.readyState&&200==e.status){var t=JSON.parse(e.responseText);console.log(t),v(t.rows),i(!0)}},e.open("POST","http://eos.greymass.com/v1/chain/get_table_rows"),e.send('{"table":"requests","scope":"travelrefund","code":"travelrefund","limit":100,"json":true}')}}),[l]),"mobile_browser"==T||"desktop_browser"==T)return o.a.createElement("div",null,"Use the TokenPocket app or EOS Lynx");return o.a.createElement(o.a.Fragment,null,o.a.createElement("div",null,o.a.createElement("div",{className:"hideOnDesktop",style:{paddingBottom:40}},o.a.createElement("img",{src:"/img/rio_mobile.jpg"})),o.a.createElement("div",null,a),o.a.createElement("div",{style:{paddingBottom:40}},w?o.a.createElement("div",{style:{display:"flex"}},o.a.createElement("div",{style:{flex:1}},w)," ",o.a.createElement("div",null,o.a.createElement("button",{className:"small-button",onClick:function(){O(null),J(null),H(null),B([]),b([])}},"clear"))):o.a.createElement("input",{type:"text",onChange:function(e){b(h.filter((function(t){return t.user.includes(e.target.value.toLowerCase())})))},placeholder:"username"}),o.a.createElement(o.a.Fragment,null,w?null:p.map((function(e,t){return o.a.createElement("button",{className:"small-button",onClick:function(){O(e.user)}},e.status," ",e.user)})))),o.a.createElement("div",null,W?o.a.createElement("div",{style:{overflow:"hidden",whiteSpace:"nowrap",textOverflow:"ellipsis"}}," ",W.properties.formatted):o.a.createElement("input",{onChange:function(e){A(e.target.value)},type:"text",placeholder:"from"}),o.a.createElement(o.a.Fragment,null,W?null:F.map((function(e,t){return o.a.createElement("button",{className:"small-button",onClick:function(){J(e)}},e.properties.formatted)})))),G?o.a.createElement("div",null,"Distance: ",G," "):null,o.a.createElement(o.a.Fragment,null,G&&w?o.a.createElement(o.a.Fragment,null,o.a.createElement("button",{className:"button",onClick:function(){if(window.confirm("Approve this user?"))for(var e=0;e<M.length;++e)if(M[e].id==T)return void K(e,"approve")}},"Approve"),o.a.createElement("button",{className:"button",onClick:function(){if(window.confirm("Reject this user?"))for(var e=0;e<M.length;++e)if(M[e].id==T)return void K(e,"reject")}},"Reject")):null)))},L={code:"",message:"",stage:""},F=Object(s.b)({status:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"home",t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"switch":return document.getElementById("main-js").scrollIntoView({behavior:"smooth"}),t.payload;case"error":return document.getElementById("main-js").scrollIntoView({behavior:"smooth"}),"error";default:return e}},error:function(){arguments.length>0&&void 0!==arguments[0]&&arguments[0];var e=arguments.length>1?arguments[1]:void 0;switch(e.type){case"error":return e.payload;case"clear":case"switch":default:return L}}}),B=Object(s.c)(F),D=!1;"#admin"==window.location.hash&&(D=!0);l.a.render(o.a.createElement(i.a,{store:B},o.a.createElement("div",{style:{display:"flex",flexDirection:"column"}},o.a.createElement("div",{className:"nav-desktop"},o.a.createElement("div",{style:(A={flexGrow:1,padding:"13px 25px",display:"flex",flexDirection:"column"},Object(n.a)(A,"flexGrow",1),Object(n.a)(A,"letterSpacing","1px"),Object(n.a)(A,"fontSize",19),A)}," TRAVEL REIMBURSMENT FUND"),o.a.createElement("div",{style:{maxHeight:200,borderBottomRightRadius:5,borderBottomLeftRadius:5,padding:"13px 25px",backgroundColor:"#F3F5F9",letterSpacing:"1px",fontWeight:"bold",fontSize:19}},o.a.createElement("a",{style:{textDecoration:"none"},target:"_blank",href:"http://eosdetroit.io"},"EOS DETROIT"))),o.a.createElement("div",{className:"nav-mobile",style:{textAlign:"center"}},o.a.createElement("div",{style:{fontSize:26,padding:20,backgroundColor:"#bfc3c9"}},"EOS DETROIT"),o.a.createElement("div",{style:{padding:20,backgroundColor:"#f3f5f9"}},"TRAVEL REIMBURSMENT FUND")),o.a.createElement("div",{id:"main-js",className:"main"},o.a.createElement("div",{className:"left",style:{minHeight:"80vh",padding:"20px 20px 0"}},D?o.a.createElement(R,null):o.a.createElement(j,null)),o.a.createElement("div",{className:"right"},o.a.createElement("div",null,o.a.createElement("img",{src:"/img/rio_sky.jpg"})))),o.a.createElement((function(){return o.a.createElement("div",{style:{marginTop:40,paddingTop:20,paddingLeft:10,paddingRight:10,paddingBottom:60,backgroundColor:"#f3f5f9",fontSize:14,display:"flex",justifyContent:"center"}},o.a.createElement("div",{style:{maxWidth:503,textAlign:"center"}},o.a.createElement("br",null),o.a.createElement("link",{href:"//cdn-images.mailchimp.com/embedcode/horizontal-slim-10_7.css",rel:"stylesheet",type:"text/css"}),o.a.createElement("div",null,"Subscribe and be notified of future EOS Community Conferences."),o.a.createElement("div",{id:"mc_embed_signup"},o.a.createElement("form",{action:"https://eosdetroit.us18.list-manage.com/subscribe/post?u=fc364bf57aca4a23d8d5bffb0&id=3bdceba087",method:"post",id:"mc-embedded-subscribe-form",name:"mc-embedded-subscribe-form",className:"validate",target:"_blank",noValidate:!0},o.a.createElement("div",{id:"mc_embed_signup_scroll"},o.a.createElement("input",{type:"email",name:"EMAIL",className:"email",id:"mce-EMAIL",placeholder:"email address",required:!0}),o.a.createElement("div",{style:{position:"absolute",left:"-5000px"},"aria-hidden":"true"},o.a.createElement("input",{type:"text",name:"b_fc364bf57aca4a23d8d5bffb0_3bdceba087",tabIndex:"-1",readOnly:!0,value:""})),o.a.createElement("div",{className:"clear mailchimp-subscribe-eos"},o.a.createElement("input",{type:"submit",value:"Subscribe",name:"subscribe",id:"mc-embedded-subscribe",className:"button"})))))))}),null),o.a.createElement("div",{style:{bottom:0,position:"fixed",right:0,padding:20}},o.a.createElement("a",{href:"http://eosdetroit.io",target:"_blank"},o.a.createElement("img",{width:65,src:"/img/eos_detroit_logo_transparent.png"}))))),document.getElementById("root"))},74:function(e,t,a){e.exports=a(144)},83:function(e,t,a){},92:function(e,t){},97:function(e,t){},99:function(e,t){}},[[74,1,2]]]);
//# sourceMappingURL=main.485a0fd7.chunk.js.map