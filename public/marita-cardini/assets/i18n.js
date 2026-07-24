/* Marita Cardini — bilingual ES/EN toggle. Runs after partials.js. */
(function () {
  var STORE = 'mc_lang';
  var T = {
    es: {
      /* NAV */
      'nav.collection': 'Colección',
      'nav.about':      'Nosotros',
      'nav.contact':    'Contacto',
      'nav.cta':        'Reservá tu cita',
      /* HERO */
      'hero.eyebrow':  'Boutique Bathroom Decor · Buenos Aires',
      'hero.h1':       'Una nueva forma<br>de vivir <em>el baño.</em>',
      'hero.sub':      'Piezas de cerámica y grifería hechas a mano, con diseño de autor para cada proyecto.',
      'hero.cta1':     'Reservá tu cita',
      'hero.cta2':     'Ver la colección',
      'hero.meta1':    'Palermo, Buenos Aires',
      'hero.meta2':    'Desde 1986',
      /* SIGBAND */
      'sig.eyebrow': 'El oficio',
      'sig.h2':      'Una sola mano guía cada <em>pieza.</em>',
      'sig.body':    'Los mejores artesanos diseñan y modelan bajo la guía de Marita. La grifería se produce sólo para nosotros, con los más altos estándares. El resultado es una colección de objetos elegidos bajo una misma estética.',
      'sig.link':    'Nuestra historia y oficio',
      /* COLLECTION */
      'coll.eyebrow': 'Qué hacemos',
      'coll.h2':      'Todo para el baño,<br>bajo un mismo <em>criterio.</em>',
      'coll.body':    'Cinco familias de objetos que conversan entre sí. Tocá cada una para ver la colección.',
      /* GALLERY */
      'gal.eyebrow': 'Piezas &amp; ambientes',
      'gal.h2':      'Ninguna igual<br>a la <em>anterior.</em>',
      'gal.body':    'Cada bacha se modela y se pinta a mano. Un catálogo de piezas irrepetibles.',
      'gal.hint':    'Arrastrá para explorar →',
      /* STORY */
      'story.eyebrow': 'Nosotros',
      'story.h2':      'Todo empezó<br>con los <em>personajes</em><br>de un cuento.',
      'story.body':    'Marita, artista plástica y ceramista, recibe el pedido de una amiga belga para pintar los azulejos de su cocina. Del boca en boca nació todo lo demás.',
      'story.btn':     'Nuestra historia',
      /* ATELIER */
      'atelier.eyebrow': 'Hecho a mano',
      'atelier.h2':      'De la arcilla<br>a tu <em>casa.</em>',
      'atelier.body':    'Modelamos, horneamos y pintamos cada pieza. La grifería se fabrica sólo para nosotros: calidad y plazos que son, desde hace años, una referencia en el mercado.',
      /* CITA */
      'cita.eyebrow': 'La cita',
      'cita.h2':      'Cada cliente,<br>un proyecto <em>único.</em>',
      'cita.body':    'Cada proyecto nace de una conversación. En una cita conocemos tu espacio, tu estilo y tu manera de habitar el baño, para crear piezas hechas a mano, pensadas para tu casa y para nadie más.',
      'cita.s1.t':    'Nos contás tu idea',
      'cita.s1.b':    'El ambiente, los materiales y el estilo que buscás.',
      'cita.s2.t':    'Diseñamos juntos',
      'cita.s2.b':    'Elegimos formas, esmaltes y terminaciones a medida.',
      'cita.s3.t':    'Lo hacemos a mano',
      'cita.s3.b':    'Fabricamos la pieza y la entregamos lista para colocar.',
      'cita.btn':     'Reservá tu cita',
      /* FOOTER */
      'footer.closing':    'Una nueva forma de <em>vivir el baño.</em>',
      'footer.cta':        'Reservá tu cita',
      'footer.visit.h':    'Visitá el local',
      'footer.contact.h':  'Contacto',
      'footer.directions': 'Cómo llegar →',
      'footer.brand.cap':  'Boutique Bathroom Decor · desde 1986',
      /* NOSOTROS PAGE */
      'nos.eyebrow':    'Nosotros · El oficio',
      'nos.h1':         'Una sola mano,<br><em>una sola visión.</em>',
      'nos.sub':        'Cuarenta años dando forma al baño en Buenos Aires. Pieza por pieza, hechas a mano.',
      'nos.prose.ey':   'Todo empezó con los personajes de un cuento',
      'nos.prose.h2':   'Del <em>boca en boca</em><br>nació todo lo demás.',
      'nos.prose.p1':   'Marita, artista plástica y ceramista, recibe el pedido de una amiga belga para pintar los azulejos de su cocina. Lo que empezó como un favor se transformó en un oficio.',
      'nos.prose.p2':   'De las cocinas pasamos a los baños; de los azulejos, a las bachas, la grifería y los muebles. Cada objeto pensado y elegido bajo una misma estética: la de una sola persona detrás de toda la colección.',
      /* MENU */
      'menu.cita':    'Reservá tu cita',
      'menu.contact': 'Contacto',
    },
    en: {
      /* NAV */
      'nav.collection': 'Collection',
      'nav.about':      'About',
      'nav.contact':    'Contact',
      'nav.cta':        'Book an appointment',
      /* HERO */
      'hero.eyebrow':  'Boutique Bathroom Decor · Buenos Aires',
      'hero.h1':       'A new way<br>to experience <em>the bathroom.</em>',
      'hero.sub':      'Handmade ceramic pieces and fittings, designed by one author for every project.',
      'hero.cta1':     'Book an appointment',
      'hero.cta2':     'View the collection',
      'hero.meta1':    'Palermo, Buenos Aires',
      'hero.meta2':    'Since 1986',
      /* SIGBAND */
      'sig.eyebrow': 'The craft',
      'sig.h2':      'One hand guides every <em>piece.</em>',
      'sig.body':    'The finest craftspeople design and shape each piece under Marita\'s direction. Our fittings are made exclusively for us, to the highest standards. The result: a collection of objects chosen under a single aesthetic vision.',
      'sig.link':    'Our story and craft',
      /* COLLECTION */
      'coll.eyebrow': 'What we make',
      'coll.h2':      'Everything for the bathroom,<br>under one <em>vision.</em>',
      'coll.body':    'Five families of objects that speak to one another. Tap each one to view the collection.',
      /* GALLERY */
      'gal.eyebrow': 'Pieces &amp; spaces',
      'gal.h2':      'No two<br><em>alike.</em>',
      'gal.body':    'Every basin is modelled and painted by hand. A catalogue of unrepeatable pieces.',
      'gal.hint':    'Drag to explore →',
      /* STORY */
      'story.eyebrow': 'About us',
      'story.h2':      'It all started<br>with the <em>characters</em><br>of a story.',
      'story.body':    'Marita, a visual artist and ceramicist, was asked by a Belgian friend to paint the tiles in her kitchen. From word of mouth, everything else followed.',
      'story.btn':     'Our story',
      /* ATELIER */
      'atelier.eyebrow': 'Handmade',
      'atelier.h2':      'From clay<br>to your <em>home.</em>',
      'atelier.body':    'We model, fire and paint every piece. Our fittings are manufactured exclusively for us — quality and lead times that have been a benchmark in the market for decades.',
      /* CITA */
      'cita.eyebrow': 'The appointment',
      'cita.h2':      'Each client,<br>a unique <em>project.</em>',
      'cita.body':    'Every project begins with a conversation. In a single appointment we learn your space, your style and the way you live your bathroom, to create pieces made by hand — for your home and no one else\'s.',
      'cita.s1.t':    'Tell us your vision',
      'cita.s1.b':    'The space, the materials and the style you are looking for.',
      'cita.s2.t':    'We design together',
      'cita.s2.b':    'We choose shapes, glazes and finishes made to measure.',
      'cita.s3.t':    'We make it by hand',
      'cita.s3.b':    'We craft the piece and deliver it ready to install.',
      'cita.btn':     'Book an appointment',
      /* FOOTER */
      'footer.closing':    'A new way to <em>experience the bathroom.</em>',
      'footer.cta':        'Book an appointment',
      'footer.visit.h':    'Visit the showroom',
      'footer.contact.h':  'Contact',
      'footer.directions': 'Get directions →',
      'footer.brand.cap':  'Boutique Bathroom Decor · since 1986',
      /* NOSOTROS PAGE */
      'nos.eyebrow':    'About · The craft',
      'nos.h1':         'One hand,<br><em>one vision.</em>',
      'nos.sub':        'Forty years shaping bathrooms in Buenos Aires. Piece by piece, made by hand.',
      'nos.prose.ey':   'It all began with the characters of a story',
      'nos.prose.h2':   'From <em>word of mouth</em><br>everything else followed.',
      'nos.prose.p1':   'Marita, a visual artist and ceramicist, was asked by a Belgian friend to paint the tiles in her kitchen. What began as a favour became a lifelong craft.',
      'nos.prose.p2':   'From kitchens we moved to bathrooms; from tiles, to basins, fittings and furniture. Every object designed and chosen under the same aesthetic: one person behind the entire collection.',
      /* MENU */
      'menu.cita':    'Book an appointment',
      'menu.contact': 'Contact',
    }
  };

  var urlLang = new URLSearchParams(location.search).get('lang');
  var lang = urlLang || localStorage.getItem(STORE) || 'es';
  if (!T[lang]) lang = 'es';

  function apply(l) {
    lang = l;
    localStorage.setItem(STORE, l);
    document.documentElement.lang = l;
    var btn = document.getElementById('lang-toggle');
    if (btn) btn.textContent = l === 'es' ? 'EN' : 'ES';
    var map = T[l];
    Object.keys(map).forEach(function (k) {
      document.querySelectorAll('[data-t="' + k + '"]').forEach(function (el) {
        el.innerHTML = map[k];
      });
    });
  }

  window.__mcLang = { apply: apply, get: function () { return lang; } };

  document.addEventListener('DOMContentLoaded', function () {
    var btn = document.getElementById('lang-toggle');
    if (btn) btn.addEventListener('click', function () {
      apply(lang === 'es' ? 'en' : 'es');
    });
    apply(lang);
  });
})();
