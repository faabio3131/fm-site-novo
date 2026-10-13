(function(){
  var r=document.documentElement,k='fm-theme';
  function set(t){r.setAttribute('data-theme',t);try{localStorage.setItem(k,t)}catch(e){}}
  var b=document.getElementById('theme');
  if(b)b.addEventListener('click',function(){set(r.getAttribute('data-theme')==='dark'?'light':'dark')});
  var m=document.getElementById('burger'),mn=document.getElementById('menu');
  if(m)m.addEventListener('click',function(){mn.classList.toggle('open')});
})();

// Hero 3D: só baixa o Three.js quando o palco aparece na tela e o aparelho permite
(function(){
  var h=document.getElementById('fm3d');if(!h)return;
  try{
    var c=document.createElement('canvas'),ok=!!(window.WebGLRenderingContext&&(c.getContext('webgl2')||c.getContext('webgl')));
    var cn=navigator.connection;if(!ok||(cn&&cn.saveData))return;
  }catch(e){return}
  var url=new URL(h.getAttribute('data-src'),location.href).href,done=false;
  function go(){
    if(done)return;done=true;
    import(url).then(function(m){m.mount(h)}).catch(function(){h.classList.remove('is3d')});
  }
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(e){if(e[0].isIntersecting){io.disconnect();go()}},{rootMargin:'200px'});io.observe(h);
  }else go();
})();
