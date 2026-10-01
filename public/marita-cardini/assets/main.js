/* Marita Cardini — motion. GSAP + ScrollTrigger. Page-agnostic, reduced-motion & hidden-tab safe. */
(function () {
  "use strict";
  var reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  function all(s, c){ return Array.prototype.slice.call((c||document).querySelectorAll(s)); }

  var yr = document.getElementById("yr"); if (yr) yr.textContent = new Date().getFullYear();
  if (window.gsap) gsap.registerPlugin(ScrollTrigger);
  var motionOK = !!window.gsap && !reduce;

  var REVEAL_SEL = [
    ".story__copy > *", ".story__media",
    ".sigband .eyebrow", ".sigband h2", ".sigband .body", ".sigband .link-underline",
    ".coll__head > div", ".coll__head .body", ".ctile",
    ".gallery__head > div", ".gallery__head .body", ".gcard",
    ".cita__copy > *", ".cita__media",
    ".pagehead__meta > *", ".catgrid__item", ".prose > *", ".timeline__row",
    ".footer__cta-row > *", ".footer__grid > *"
  ].join(",");

  function markReveals(){ all(REVEAL_SEL).forEach(function(el){ el.classList.add("reveal"); }); }
  function showAll(){
    all(".reveal").forEach(function(el){ el.style.opacity=1; el.style.transform="none"; el.style.filter="none"; });
    all("[data-reveal-media]").forEach(function(el){ el.style.clipPath="none"; });
    all(".sig,#sigMark,.sigband__mark").forEach(function(el){ el.style.clipPath="none"; });
  }

  var revealed = false;
  function revealSite(){ document.body.classList.remove("is-loading"); if (window.ScrollTrigger) ScrollTrigger.refresh(); }
  function boot(){
    if (revealed) return; revealed = true;
    revealSite();
    if (document.querySelector(".hero__bg")) heroIntro();
    initScroll();
  }
  function finishInstant(){
    if (revealed) return; revealed = true;
    var pl = document.getElementById("preloader"); if (pl) pl.remove();
    var hbg = document.querySelector(".hero__bg"); if (hbg) hbg.style.opacity = "";
    revealSite(); markReveals(); showAll();
  }

  markReveals();

  if (!motionOK) {
    finishInstant();
  } else if (document.getElementById("preloader")) {
    var tl = gsap.timeline();
    tl.to("#preloader .sig", { clipPath: "inset(0 0% 0 0)", duration: 1.4, ease: "power2.inOut", delay: .3 })
      .to("#preloader .sig", { opacity: 0, duration: .5, ease: "power1.in", delay: .3 })
      .to("#preloader", { yPercent: -101, duration: .9, ease: "power4.inOut", onStart: boot }, "-=.1")
      .set("#preloader", { display: "none" });
    setTimeout(finishInstant, 6500); // safety backstop
  } else {
    boot(); // inner pages (no preloader)
  }

  /* hero intro (full-bleed home hero) */
  function heroIntro(){
    // Reveal the video that was hidden to prevent flash before preloader exits
    gsap.to(".hero__bg", { opacity: 1, duration: .6, ease: "power2.out" });
    gsap.from(".hero__h1 .line > span", { yPercent: 115, duration: 1.15, ease: "power4.out", stagger: .12, delay: .05 });
    gsap.from([".hero__eyebrow", ".hero__sub", ".hero__cta"], { opacity: 0, y: 22, duration: .9, ease: "power2.out", stagger: .1, delay: .35 });
    gsap.from(".hero__meta", { opacity: 0, duration: 1, ease: "power2.out", delay: .8 });
    gsap.fromTo(".hero__bg", { scale: 1.14 }, { scale: 1, duration: 2.6, ease: "power2.out" });
    // parallax on desktop only — scrub is expensive on iOS
    if (!matchMedia("(max-width: 900px)").matches) {
      gsap.to(".hero__inner", { yPercent: -18, opacity: .25, ease: "none",
        scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true } });
      gsap.to(".hero__bg", { yPercent: 12, ease: "none",
        scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true } });
    }
  }

  /* scroll-driven */
  var isSmall = matchMedia("(max-width: 900px)").matches;

  function initScroll(){
    ScrollTrigger.batch(".reveal", {
      start: "top 88%",
      onEnter: function(els){ gsap.to(els, { opacity: 1, y: 0, filter: "blur(0px)", duration: 1, ease: "power3.out", stagger: .07, overwrite: true }); }
    });

    // Simple fade + slide reveal — no clip-path (was getting stuck showing a thin strip)
    all("[data-reveal-media]").forEach(function(m){
      var img = m.querySelector("img, video");
      gsap.fromTo(m, { opacity: 0, y: 40 }, {
        opacity: 1, y: 0, duration: 1.1, ease: "power3.out",
        scrollTrigger: { trigger: m, start: "top 92%", once: true }
      });
      if (img && !isSmall) gsap.fromTo(img, { scale: 1.1 }, {
        scale: 1, ease: "none",
        scrollTrigger: { trigger: m, start: "top bottom", end: "bottom top", scrub: true }
      });
    });

    // Parallax on media — desktop only (scrub causes iOS jank)
    if (!isSmall) {
      all(".story__media img, .cita__media img, .gcard__media img, .ctile__img img, .catgrid__item img").forEach(function(img){
        gsap.to(img, { yPercent: -6, ease: "none", scrollTrigger: { trigger: img.closest("*"), start: "top bottom", end: "bottom top", scrub: true } });
      });
    }

    var sig = document.getElementById("sigMark");
    if (sig) gsap.to(sig, { clipPath: "inset(0 0% 0 0)", duration: 1.6, ease: "power2.inOut", scrollTrigger: { trigger: sig, start: "top 80%", once: true } });

    var av = document.querySelector(".atelier video");
    if (av && !isSmall) gsap.fromTo(av, { scale: 1.12 }, { scale: 1, ease: "none", scrollTrigger: { trigger: ".atelier", start: "top bottom", end: "bottom top", scrub: true } });

    // pagehero (inner pages) reveal
    if (document.querySelector(".pagehero")) {
      gsap.from(".pagehero__title", { yPercent: 30, opacity: 0, duration: 1.1, ease: "power4.out" });
      gsap.from(".pagehero__eyebrow, .pagehero__sub", { opacity: 0, y: 18, duration: .9, ease: "power2.out", stagger: .12, delay: .15 });
      gsap.fromTo(".pagehero__bg", { scale: 1.12 }, { scale: 1, duration: 2.2, ease: "power2.out" });
    }

    // marquee drift on scroll (adds velocity feel) — subtle
    var mtrack = document.querySelector(".marquee__track");
    if (mtrack) gsap.to(mtrack, { xPercent: -8, ease: "none", scrollTrigger: { trigger: ".marquee", start: "top bottom", end: "bottom top", scrub: 1 } });
  }

  /* nav state */
  var nav = document.getElementById("nav");
  function setNav(){ if (nav) nav.classList.toggle("scrolled", window.scrollY > 40); }
  if (window.ScrollTrigger && nav) ScrollTrigger.create({ start: 0, end: "max", onUpdate: setNav, onRefreshInit: setNav });
  setNav();

  /* fullscreen menu */
  var burger = document.getElementById("burger"), menu = document.getElementById("menu");
  function toggleMenu(open){
    if (!menu) return;
    menu.classList.toggle("open", open);
    document.body.style.overflow = open ? "hidden" : "";
    var s = burger.querySelectorAll("span");
    if (open){ s[0].style.transform = "translateY(3.7px) rotate(45deg)"; s[1].style.transform = "translateY(-3.7px) rotate(-45deg)"; }
    else { s[0].style.transform = ""; s[1].style.transform = ""; }
  }
  if (burger) burger.addEventListener("click", function(){ toggleMenu(!menu.classList.contains("open")); });
  all("#menu a").forEach(function(a){ a.addEventListener("click", function(){ toggleMenu(false); }); });
  var mclose = document.getElementById("menu-close");
  if (mclose) mclose.addEventListener("click", function(){ toggleMenu(false); });

  /* horizontal drag-to-scroll (gallery + category rows) */
  all(".gtrack").forEach(function(t){
    var down=false, sx=0, sl=0, moved=false;
    t.addEventListener("mousedown", function(e){ down=true; moved=false; sx=e.pageX; sl=t.scrollLeft; t.classList.add("drag"); });
    window.addEventListener("mouseup", function(){ down=false; t.classList.remove("drag"); });
    t.addEventListener("mouseleave", function(){ down=false; t.classList.remove("drag"); });
    t.addEventListener("mousemove", function(e){ if(!down) return; e.preventDefault(); if(Math.abs(e.pageX-sx)>4) moved=true; t.scrollLeft = sl-(e.pageX-sx)*1.15; });
    t.addEventListener("click", function(e){ if(moved){ e.preventDefault(); } }, true);
  });

  window.addEventListener("resize", function(){ if (window.ScrollTrigger) ScrollTrigger.refresh(); });
})();
