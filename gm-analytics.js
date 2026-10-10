/* Getmoney anonymous daily visits v1; no account names, IPs or query strings. */
(function(){'use strict';
var q=new URLSearchParams(location.search),test=q.get('gm_test')==='1',storage;
try{storage=window.localStorage;if(q.get('gm_no_track')==='1')storage.setItem('gm.analytics.exclude','1');if(storage.getItem('gm.analytics.exclude')==='1')return;}catch(e){}if(q.get('gm_no_track')==='1')return;
if(!test&&(navigator.webdriver||navigator.doNotTrack==='1'||navigator.globalPrivacyControl===true))return;
var day=new Date(Date.now()+9*3600e3).toISOString().slice(0,10),uuid=function(){return crypto.randomUUID()},id;
try{var saved=JSON.parse(storage.getItem('gm.analytics.daily')||'null');id=saved&&saved.day===day?saved.id:uuid();storage.setItem('gm.analytics.daily',JSON.stringify({day:day,id:id}));}catch(e){id=uuid();}
var ref='';try{ref=new URL(document.referrer).hostname;}catch(e){}
var own=ref===location.hostname,source=/instagram\.com$/.test(ref)?'instagram':/(^|\.)google\./.test(ref)?'google':/(^|\.)naver\.com$/.test(ref)?'naver':ref&&!own?'other':'direct';
var attribution={source:source,medium:source==='direct'?'direct':'referral',content:''};
if(q.get('utm_source')==='instagram'){attribution={source:'instagram',medium:['dm','profile'].includes(q.get('utm_medium'))?q.get('utm_medium'):'other',content:q.get('utm_content')||''};}
try{var last=JSON.parse(sessionStorage.getItem('gm.analytics.entry')||'null');if(own&&last&&Date.now()-last.at<1800000)attribution=last.value;sessionStorage.setItem('gm.analytics.entry',JSON.stringify({at:Date.now(),value:attribution}));}catch(e){}
var device=/iPad|Tablet/i.test(navigator.userAgent)?'tablet':/Mobi|Android|iPhone/i.test(navigator.userAgent)?'mobile':'desktop';
function send(kind,target){var body=JSON.stringify(Object.assign({id:uuid(),visitor:id,path:location.pathname,kind:kind,device:device,referrer:ref?'https://'+ref:'',target:target||'',test:test},attribution));try{if(!navigator.sendBeacon("https://win-tsudd267fv1.tail6227ca.ts.net/collect",new Blob([body],{type:'text/plain'})))fetch("https://win-tsudd267fv1.tail6227ca.ts.net/collect",{method:'POST',mode:'cors',credentials:'omit',keepalive:true,headers:{'Content-Type':'text/plain'},body:body}).catch(function(){});}catch(e){}}
var sent=false;function view(){if(!sent&&document.visibilityState==='visible'){sent=true;send('view');}}document.addEventListener('visibilitychange',view);view();
document.addEventListener('click',function(e){var a=e.target.closest&&e.target.closest('a[href]');if(!a)return;try{var to=new URL(a.href);if(to.protocol==='https:'&&to.hostname!==location.hostname&&!/instagram\.com$/.test(to.hostname))send('outbound',to.origin);}catch(e){}},true);
})();