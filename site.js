/* brokerly.az — language toggle + CRM demo (tabs & count-up) */
(function(){
  var KEY = "brokerly-lang";
  var titles = {
    az: document.documentElement.getAttribute("data-title-az") || document.title,
    en: document.documentElement.getAttribute("data-title-en") || document.title
  };
  function setLang(lang){
    var en = lang === "en";
    document.documentElement.classList.toggle("lang-en", en);
    document.documentElement.setAttribute("lang", en ? "en" : "az");
    document.title = en ? titles.en : titles.az;
    var az = document.getElementById("langAz"), enB = document.getElementById("langEn");
    if(az && enB){ az.classList.toggle("on", !en); enB.classList.toggle("on", en); }
    try{ localStorage.setItem(KEY, lang); }catch(e){}
  }
  var saved = null;
  try{ saved = localStorage.getItem(KEY); }catch(e){}
  setLang(saved === "en" ? "en" : "az");
  var az = document.getElementById("langAz"), en = document.getElementById("langEn");
  if(az) az.addEventListener("click", function(){ setLang("az"); });
  if(en) en.addEventListener("click", function(){ setLang("en"); });
})();

/* ---- CRM demo ---- */
(function(){
  var demo = document.getElementById("crmDemo");
  if(!demo) return;

  function fmt(n){
    var s = String(Math.round(n));
    return s.replace(/\B(?=(\d{3})+(?!\d))/g, " "); /* thin space thousands */
  }
  function countUp(el){
    var target = parseFloat(el.getAttribute("data-count") || "0");
    var dur = Math.min(1400, 500 + target * 0.4);
    var t0 = null;
    function step(ts){
      if(t0 === null) t0 = ts;
      var p = Math.min(1, (ts - t0) / dur);
      var eased = 1 - Math.pow(1 - p, 3); /* easeOutCubic */
      el.textContent = fmt(target * eased);
      if(p < 1) requestAnimationFrame(step);
      else el.textContent = fmt(target);
    }
    requestAnimationFrame(step);
  }
  function animatePane(pane){
    pane.querySelectorAll(".cnt[data-count]").forEach(function(el){
      el.textContent = "0";
      countUp(el);
    });
  }

  /* tabs */
  var tabs = demo.querySelectorAll(".demo-tabs button");
  tabs.forEach(function(btn){
    btn.addEventListener("click", function(){
      tabs.forEach(function(b){ b.classList.remove("on"); b.setAttribute("aria-selected","false"); });
      btn.classList.add("on");
      btn.setAttribute("aria-selected","true");
      demo.querySelectorAll(".demo-pane").forEach(function(p){ p.classList.remove("on"); });
      var pane = document.getElementById(btn.getAttribute("data-pane"));
      pane.classList.add("on");
      animatePane(pane);
    });
  });

  /* first animation when the demo scrolls into view */
  var fired = false;
  if("IntersectionObserver" in window){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if(e.isIntersecting && !fired){
          fired = true;
          animatePane(demo.querySelector(".demo-pane.on"));
          io.disconnect();
        }
      });
    }, {threshold:.35});
    io.observe(demo);
  } else {
    animatePane(demo.querySelector(".demo-pane.on"));
  }
})();


/* theme toggle (shared) */
(function(){
  var tb=document.getElementById("themeBtn");
  if(tb)tb.addEventListener("click",function(){
    var d=document.documentElement.classList.toggle("dark");
    try{localStorage.setItem("brokerly-theme", d?"dark":"light");}catch(e){}
  });
})();

/* mobile menu (shared) */
(function(){
  var mb=document.getElementById("mbtn"), mm=document.getElementById("mmenu");
  if(mb && mm){
    mb.addEventListener("click",function(){
      var open=mm.classList.toggle("open");
      mb.setAttribute("aria-expanded", open?"true":"false");
    });
    mm.querySelectorAll("a").forEach(function(a){
      a.addEventListener("click",function(){ mm.classList.remove("open"); mb.setAttribute("aria-expanded","false"); });
    });
  }
})();
