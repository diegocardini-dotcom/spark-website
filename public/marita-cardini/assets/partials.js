/* Shared chrome (nav + menu + footer) injected into every page.
   Runs before main.js and i18n.js. */
(function () {
  var over = document.body.hasAttribute("data-nav-over");
  var here = (location.pathname.split("/").pop() || "index.html");

  var ARROW = '<span class="ic" aria-hidden="true"><svg viewBox="0 0 16 16" fill="none"><path d="M4 12L12 4M12 4H6M12 4V10" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg></span>';

  var nav =
    '<nav class="nav' + (over ? " nav--over" : "") + '" id="nav">' +
      '<a href="index.html" class="nav__brand" aria-label="Marita Cardini"><img src="assets/img/marita-ink.png" alt="Marita Cardini"></a>' +
      '<div class="nav__right">' +
        '<div class="nav__links">' +
          '<a href="index.html#coleccion" data-t="nav.collection">Colección</a>' +
          '<a href="nosotros.html" data-t="nav.about">Nosotros</a>' +
          '<a href="#contacto" data-t="nav.contact">Contacto</a>' +
        '</div>' +
        '<button id="lang-toggle" class="lang-toggle" aria-label="Switch language">EN</button>' +
        '<a href="mailto:info@maritacardini.com?subject=Quiero%20reservar%20una%20cita" class="btn"><span data-t="nav.cta">Reservá tu cita</span> ' + ARROW + '</a>' +
      '</div>' +
      '<button class="nav__burger" id="burger" aria-label="Menú"><span></span><span></span></button>' +
    '</nav>' +
    '<div class="menu" id="menu">' +
      '<button class="menu__close" id="menu-close" aria-label="Cerrar menú">Cerrar<span aria-hidden="true">×</span></button>' +
      '<a href="index.html#coleccion" data-t="nav.collection">Colección</a>' +
      '<a href="nosotros.html" data-t="nav.about">Nosotros</a>' +
      '<a href="mailto:info@maritacardini.com?subject=Quiero%20reservar%20una%20cita" data-t="menu.cita">Reservá tu cita</a>' +
      '<a href="#contacto" data-t="menu.contact">Contacto</a>' +
      '<button class="menu__lang" id="menu-lang" aria-label="Switch language">EN</button>' +
      '<div class="menu__foot"><span class="cap">Ugarteche 3146 · Palermo</span><span class="cap">(011) 4802-0193</span></div>' +
    '</div>';

  var footer =
    '<footer class="footer" id="contacto" role="contentinfo">' +
      '<div class="wrap">' +
        '<div class="footer__cta-row">' +
          '<h2 class="footer__closing" data-t="footer.closing">Una nueva forma de <em>vivir el baño.</em></h2>' +
          '<a href="mailto:info@maritacardini.com?subject=Quiero%20reservar%20una%20cita" class="btn btn--light"><span data-t="footer.cta">Reservá tu cita</span> ' + ARROW + '</a>' +
        '</div>' +
        '<div class="footer__grid">' +
          '<div class="footer__info">' +
            '<div class="footer__col footer__brand">' +
              '<div class="footer__mark" role="img" aria-label="Marita Cardini"></div>' +
              '<span class="cap" data-t="footer.brand.cap">Boutique Bathroom Decor · desde 1986</span>' +
            '</div>' +
            '<div class="footer__cols">' +
              '<div class="footer__col"><h4 data-t="footer.visit.h">Visitá el local</h4><p>Ugarteche 3146<br>Palermo, C1425EVH<br>Ciudad de Buenos Aires<br>Lunes a Viernes, 13 a 19 h</p></div>' +
              '<div class="footer__col"><h4 data-t="footer.contact.h">Contacto</h4>' +
                '<a href="tel:+541148020193">(011) 4802-0193</a>' +
                '<a href="mailto:info@maritacardini.com">info@maritacardini.com</a>' +
                '<a href="https://www.instagram.com/maritacardini/" target="_blank" rel="noopener">Instagram</a>' +
              '</div>' +
            '</div>' +
          '</div>' +
          '<a class="footer__map" href="https://maps.google.com/?q=Ugarteche+3146+Buenos+Aires" target="_blank" rel="noopener" aria-label="Ver ubicación en Google Maps" id="footer-map">' +
            '<span class="footer__map-tag cap" data-t="footer.directions">Cómo llegar →</span>' +
          '</a>' +
        '</div>' +
        '<div class="footer__base"><span>© <span id="yr"></span> Marita Cardini</span><span>Buenos Aires, Argentina</span></div>' +
      '</div>' +
    '</footer>';

  var ns = document.getElementById("nav-slot");
  if (ns) ns.outerHTML = nav;
  var fs = document.getElementById("footer-slot");
  if (fs) fs.outerHTML = footer;

  var yr = document.getElementById("yr");
  if (yr) yr.textContent = new Date().getFullYear();

  // Lazy-load Google Maps when user scrolls near the footer
  var mapEl = document.getElementById("footer-map");
  if (mapEl) {
    var loadMap = function() {
      var iframe = document.createElement("iframe");
      iframe.title = "Mapa · Ugarteche 3146, Palermo";
      iframe.src = "https://www.google.com/maps?q=Ugarteche%203146,%20Buenos%20Aires&output=embed";
      iframe.setAttribute("referrerpolicy", "no-referrer-when-downgrade");
      mapEl.insertBefore(iframe, mapEl.querySelector(".footer__map-tag"));
    };
    if ("IntersectionObserver" in window) {
      var obs = new IntersectionObserver(function(entries) {
        if (entries[0].isIntersecting) { loadMap(); obs.disconnect(); }
      }, { rootMargin: "400px" });
      obs.observe(mapEl);
    } else {
      loadMap();
    }
  }

  // active link
  var catPages = ["bachas.html","griferias.html","muebles.html","guardas.html","revestimientos.html"];
  if (here === "nosotros.html") {
    var lk = document.querySelector('.nav__links a[href="nosotros.html"]');
    if (lk) lk.classList.add("is-active");
  } else if (catPages.indexOf(here) !== -1) {
    var lk2 = document.querySelector('.nav__links a[href="index.html#coleccion"]');
    if (lk2) lk2.classList.add("is-active");
  }
})();
