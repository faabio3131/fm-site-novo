(function(){
  var r=document.documentElement,k='fm-theme';
  function set(t){r.setAttribute('data-theme',t);try{localStorage.setItem(k,t)}catch(e){}}
  var b=document.getElementById('theme');
  if(b)b.addEventListener('click',function(){set(r.getAttribute('data-theme')==='dark'?'light':'dark')});
  var m=document.getElementById('burger'),mn=document.getElementById('menu');
  if(m)m.addEventListener('click',function(){mn.classList.toggle('open')});
})();
