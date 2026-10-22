/* El Parmegiano · concepto v3: interacciones */
(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const isStatic = document.documentElement.classList.contains("static");
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches || isStatic;
  const CIRCULO = "https://www.sorsrewards.com/parmegiano/";

  /* nav */
  const nav = $("#nav");
  new IntersectionObserver(([e]) => nav.classList.toggle("is-scrolled", !e.isIntersecting)).observe($(".hero .caps"));
  const mm = $("#mmenu");
  $("#burger").onclick = () => mm.classList.add("open");
  $("#mclose").onclick = () => mm.classList.remove("open");
  $$("#mmenu a").forEach(a => (a.onclick = () => mm.classList.remove("open")));

  /* ── locales ── */
  const LOCALES = [
    { id: "maschwitz", n: "Maschwitz", z: "escobar", a: "Colectora Este Ramal Escobar 2291", h: [["08:00-20:30"], ["09:00-13:30"]] },
    { id: "loma-verde", n: "Loma Verde", z: "escobar", a: "Colectora Este Ramal Escobar km 54,5", h: [["08:00-20:30"], ["09:00-13:30"]] },
    { id: "tortugas", n: "Tortugas", z: "escobar", a: "Golfers G.C. 3099, Small Center Tortugas", h: [["09:00-21:00"], ["09:00-13:00"]] },
    { id: "pilar", n: "Pilar", z: "escobar", a: "Escala 45, Colectora Este 9300", h: [["09:00-20:30"], ["09:00-13:30"]] },
    { id: "zarate", n: "Zárate", z: "zc", a: "Independencia 902", h: [["09:00-13:30", "16:30-20:30"], []] },
    { id: "campana", n: "Campana", z: "zc", a: "San Martín 397", h: [["08:30-13:30", "16:30-20:30"], []] },
    { id: "martinez", n: "Martínez", z: "norte", a: "Av. Santa Fe 1598", h: [["09:00-20:00"], []] },
    { id: "punta-chica", n: "Punta Chica", z: "norte", a: "Av. del Libertador 2940", h: [["09:00-21:00"], ["09:00-13:30"]] },
    { id: "ituzaingo", n: "Ituzaingó", z: "oeste", a: "Gral. Félix Olazábal 668", h: [["09:00-21:00"], ["09:00-13:30"]] },
    { id: "devoto", n: "Devoto", z: "oeste", a: "Av. Francisco Beiro 5272, CABA", h: [["09:00-21:00"], ["09:00-13:00"]] },
  ];
  const ZONES = [["all", "Todos"], ["escobar", "Escobar y Pilar"], ["zc", "Zárate y Campana"], ["norte", "Zona Norte"], ["oeste", "Oeste y CABA"]];

  const nowAR = () => {
    const p = Object.fromEntries(new Intl.DateTimeFormat("en-US", { timeZone: "America/Argentina/Buenos_Aires", weekday: "short", hour: "2-digit", minute: "2-digit", hour12: false }).formatToParts(new Date()).map(x => [x.type, x.value]));
    return { sun: p.weekday === "Sun", min: (+p.hour % 24) * 60 + +p.minute };
  };
  const toMin = s => { const [h, m] = s.split(":").map(Number); return h * 60 + m; };
  const hhmm = s => s.replace(/^0/, "").replace(":00", "");
  const status = l => {
    const { sun, min } = nowAR();
    const iv = l.h[sun ? 1 : 0];
    for (const r of iv) { const [a, b] = r.split("-"); if (min >= toMin(a) && min < toMin(b)) return { open: true, txt: `Abierto hasta las ${hhmm(b)}` }; }
    const next = iv.map(r => r.split("-")[0]).find(a => toMin(a) > min);
    return { open: false, txt: next ? `Abre a las ${hhmm(next)}` : "Cerrado ahora" };
  };
  const range = r => r.split("-").map(hhmm).join(" a ");
  const hoursTxt = l => `Lunes a sábado ${l.h[0].map(range).join(" y ")} hs` + (l.h[1].length ? `. Domingo ${range(l.h[1][0])} hs` : ". Domingo cerrado");

  const pic = $("#locpic");
  LOCALES.forEach((l, i) => {
    const im = new Image(); im.src = `assets/img/local-${l.id}.jpg`; im.alt = `Fachada del local ${l.n}`; im.loading = "lazy"; im.dataset.id = l.id;
    if (i === 0) im.className = "on";
    pic.prepend(im);
  });
  const show = l => {
    $$("img", pic).forEach(im => im.classList.toggle("on", im.dataset.id === l.id));
    $("#lcName").textContent = l.n; $("#lcAddr").textContent = l.a;
    $$(".locrow").forEach(r => r.classList.toggle("on", r.dataset.id === l.id));
  };
  let zone = "all";
  const renderZones = () => {
    $("#zones").innerHTML = ZONES.map(([k, v]) => `<button class="chip" aria-pressed="${k === zone}" data-z="${k}">${v}</button>`).join("");
    $$("#zones .chip").forEach(c => (c.onclick = () => { zone = c.dataset.z; renderZones(); renderList(); }));
  };
  const renderList = () => {
    const list = LOCALES.filter(l => zone === "all" || l.z === zone);
    $("#loclist").innerHTML = list.map(l => {
      const s = status(l);
      return `<div class="locrow" data-id="${l.id}">
        <div><h4>${l.n} <span class="state ${s.open ? "state--open" : "state--closed"}">${s.txt}</span></h4><p>${l.a}<br>${hoursTxt(l)}</p></div>
        <button class="btn btn--ink-line" data-chat="local:${l.id}">Pedir acá</button></div>`;
    }).join("");
    $$(".locrow").forEach(r => r.addEventListener("mouseenter", () => show(LOCALES.find(x => x.id === r.dataset.id))));
    if (list[0]) show(list[0]);
  };
  renderZones(); renderList();

  /* ── picadas ── */
  let gpp = 200;
  const ppl = $("#ppl");
  const kgTxt = g => (Math.round(g / 100) / 10).toLocaleString("es-AR", { minimumFractionDigits: 1, maximumFractionDigits: 1 });
  const calc = () => {
    const n = +ppl.value;
    ppl.style.setProperty("--p", ((n - 4) / 56 * 100) + "%");
    $("#pplN").textContent = n;
    $("#kg").textContent = `${kgTxt(n * gpp)} kg`;
    $("#tkKg").textContent = `${kgTxt(n * gpp)} kg`;
    $("#tkTxt").textContent = `Para ${n} personas, ${gpp === 200 ? "como comida" : "de entrada"}.`;
    $("#rec").textContent = n >= 30 ? "Para tu evento armamos una picada a medida." : n >= 16 ? "Te recomendamos la Picada A tu medida." : "Te recomendamos la Picada Clásica.";
  };
  ppl.addEventListener("input", calc);
  $$("#calc .seg button").forEach(b => (b.onclick = () => { $$("#calc .seg button").forEach(x => x.setAttribute("aria-pressed", x === b)); gpp = +b.dataset.g; calc(); }));
  calc();

  /* ── chat ── */
  const clock = () => new Intl.DateTimeFormat("es-AR", { hour: "2-digit", minute: "2-digit", hour12: false, timeZone: "America/Argentina/Buenos_Aires" }).format(new Date());
  const esc = s => s.replace(/[&<>]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c]));
  const wait = ms => new Promise(r => setTimeout(r, reduce ? 60 : ms));
  const push = (box, type, text) => {
    const el = document.createElement("div");
    el.className = "msg msg--" + type;
    el.innerHTML = `${esc(text).replace(/\*(.+?)\*/g, "<b>$1</b>")}<time>${isStatic ? "19:42" : clock()}</time>`;
    box.appendChild(el); box.scrollTop = box.scrollHeight;
  };
  const typing = async (box, ms) => {
    const t = document.createElement("div"); t.className = "typing"; t.innerHTML = "<i></i><i></i><i></i>";
    box.appendChild(t); box.scrollTop = box.scrollHeight; await wait(ms); t.remove();
  };

  const DEMO = [
    ["out", "Hola! Quiero una picada para 12 para el sábado. Estoy por Pilar"],
    ["in", "¡Hola! Para 12 personas como comida te recomiendo la *Picada Clásica*, unos 2,4 kg entre fiambres y quesos."],
    ["in", "¿La retirás en *El Parmegiano Pilar* (Escala 45) o te la enviamos?"],
    ["out", "La retiro, tipo 19"],
    ["in", "Perfecto. El sábado Pilar abre de 9 a 20:30. ¿A nombre de quién la dejo?"],
    ["out", "Lucía"],
    ["in", "¡Listo, Lucía! Tu pedido *047* quedó para el sábado a las 19 en Pilar. Te avisamos cuando esté lista."],
  ];
  const demo = $("#demoChat");
  const runDemo = async () => {
    for (;;) {
      demo.innerHTML = "";
      for (const [type, txt] of DEMO) {
        if (type === "in") await typing(demo, 900 + txt.length * 9);
        else await wait(1300);
        push(demo, type, txt);
      }
      await wait(7000);
    }
  };
  if (isStatic) DEMO.forEach(([t, x]) => push(demo, t, x));
  else new IntersectionObserver((es, o) => es.forEach(e => { if (e.isIntersecting) { runDemo(); o.disconnect(); } }), { threshold: 0.3 }).observe(demo);

  const W = $("#widget"), wchat = $("#wchat"), wqr = $("#wqr");
  const ctx = { local: null, order: 47 };
  const byZone = z => LOCALES.filter(l => l.z === z);
  const zoneChips = next => ZONES.slice(1).map(([k, v]) => [v, `${next}:${k}`]);
  const FLOWS = {
    start: () => (ctx.local = null, { bot: ["¡Hola! Bienvenido a El Parmegiano.", "¿En qué te ayudamos?"], chips: [["Quiero una picada", "picada"], ["Hacer un pedido", "pedido"], ["¿Qué local me queda cerca?", "cerca"], ["Círculo Parmegiano", "circulo"], ["Tengo un comercio", "mayorista"], ["Franquicias", "franquicia"]] }),
    picada: () => ({ bot: ["¿Para cuántas personas es?"], chips: [["Hasta 6", "p:6"], ["Entre 8 y 15", "p:12"], ["Es un evento, más de 30", "evento"]] }),
    p: n => ({ bot: [`Para ${n} personas como comida te recomendamos la *Picada Clásica*, unos ${kgTxt(n * 200)} kg entre fiambres y quesos.`, "¿La retirás en un local o te la enviamos?"], chips: [["La retiro", "retiro"], ["Envío a domicilio", "envio"]] }),
    evento: () => ({ bot: ["Para eventos armamos la picada a medida y coordinamos la entrega.", "¿Para cuándo es?"], chips: [["Este mes", "ev"], ["Más adelante", "ev"]] }),
    ev: () => ({ bot: ["Perfecto. Te escribe en unos minutos alguien de nuestro equipo de eventos para armar la propuesta."], chips: [["Volver al inicio", "start"]] }),
    pedido: () => ({ bot: ["Pasanos la lista como en el mostrador. Por ejemplo: 300 g de jamón crudo y 200 g de tybo."], chips: [["Mandar un pedido de ejemplo", "ej"]] }),
    ej: () => ({ user: "250 g de jamón crudo, 300 g de queso tybo, aceitunas y un Malbec", bot: ["Anotado:\n250 g de jamón crudo\n300 g de queso tybo\nAceitunas\n1 vino Malbec", "¿Dónde lo retirás?"], chips: [["La retiro", "retiro"], ["Envío a domicilio", "envio"]] }),
    retiro: () => ctx.local ? FLOWS.conf(ctx.local.id) : { bot: ["¿En qué zona te queda mejor?"], chips: zoneChips("rz") },
    rz: z => ({ bot: ["Elegí el local:"], chips: byZone(z).map(l => [l.n, "conf:" + l.id]) }),
    local: id => { const l = LOCALES.find(x => x.id === id); ctx.local = l; return { bot: [`Te atendemos para *El Parmegiano ${l.n}*, ${l.a}. ${status(l).txt}.`, "¿Qué querés pedir?"], chips: [["Una picada", "picada"], ["Un pedido de fiambrería", "ej"]] }; },
    conf: id => { const l = LOCALES.find(x => x.id === id); const n = ++ctx.order; return { bot: [`¡Listo! Tu pedido *0${n}* quedó en *${l.n}*. Te avisamos por acá cuando esté para retirar.`], chips: [["Volver al inicio", "start"]] }; },
    envio: () => ({ bot: ["¿En qué zona estás?"], chips: zoneChips("ez") }),
    ez: z => { const l = byZone(z)[0]; return { bot: [`Te cubre *El Parmegiano ${l.n}*. En unos minutos te confirmamos el horario de entrega.`], chips: [["Volver al inicio", "start"]] }; },
    cerca: () => ({ bot: ["¿En qué zona estás?"], chips: zoneChips("cz") }),
    cz: z => ({ bot: ["Estos son los locales de la zona:", ...byZone(z).map(l => `*${l.n}*: ${l.a}. ${status(l).txt}.`)], chips: [["Hacer un pedido", "retiro"], ["Volver al inicio", "start"]] }),
    circulo: () => ({ bot: ["El *Círculo Parmegiano* es nuestro programa de beneficios: asociarte es gratis, sumás un punto por cada peso y te regalamos 300 puntos de bienvenida.", "¿Ya sos socio?"], chips: [["Quiero asociarme", "ca"], ["Ya soy socio", "cs"]] }),
    ca: () => ({ bot: ["¡Genial! Te dejamos el link para asociarte en un minuto:\nsorsrewards.com/parmegiano"], chips: [["Abrir el Círculo", "go-circulo"], ["Volver al inicio", "start"]] }),
    cs: () => ({ bot: ["Podés ver tus puntos y canjes con tu número de socio acá:\nsorsrewards.com/parmegiano"], chips: [["Abrir el Círculo", "go-circulo"], ["Volver al inicio", "start"]] }),
    mayorista: () => ({ bot: ["Trabajamos con supermercados, almacenes, carnicerías, fiambrerías y todo tipo de comercios.", "¿Qué comercio tenés?"], chips: [["Almacén", "my"], ["Supermercado", "my"], ["Carnicería o fiambrería", "my"], ["Gastronomía", "my"]] }),
    my: () => ({ bot: ["¿En qué zona está?"], chips: ZONES.slice(1).map(([, v]) => [v, "my2"]) }),
    my2: () => ({ bot: ["¡Gracias! Un vendedor de la distribuidora te escribe hoy, en horario comercial, con la lista de precios."], chips: [["Volver al inicio", "start"]] }),
    franquicia: () => ({ bot: ["¡Qué bueno que te interese! ¿En qué zona te gustaría abrir?"], chips: [["Zona Norte", "fr"], ["Zona Oeste", "fr"], ["CABA", "fr"], ["Otra provincia", "fr"]] }),
    fr: () => ({ bot: ["¿Ya tenés local o lo estás buscando?"], chips: [["Ya tengo local", "fr2"], ["Lo estoy buscando", "fr2"]] }),
    fr2: () => ({ bot: ["Perfecto. Nuestro equipo de expansión te contacta para una primera charla y te manda toda la información."], chips: [["Volver al inicio", "start"]] }),
  };
  let busy = false;
  const step = async (key, userText) => {
    if (key === "go-circulo") { window.open(CIRCULO, "_blank", "noopener"); return; }
    if (busy) return; busy = true;
    wqr.innerHTML = "";
    const [k, arg] = key.split(":");
    const f = FLOWS[k](arg && isNaN(arg) ? arg : arg ? +arg : undefined);
    const ut = f.user || userText;
    if (ut) { push(wchat, "out", ut); await wait(450); }
    for (const b of f.bot) { await typing(wchat, 600 + b.length * 7); push(wchat, "in", b); }
    wqr.innerHTML = f.chips.map(([l, n]) => `<button data-n="${n}">${l}</button>`).join("");
    $$("button", wqr).forEach(b => (b.onclick = () => step(b.dataset.n, b.textContent)));
    busy = false;
  };
  const INTENT = { picada: ["picada", "Hola, quiero pedir una picada"], mayorista: ["mayorista", "Hola, tengo un comercio y quiero comprar por mayor"], franquicia: ["franquicia", "Hola, quiero información de franquicias"] };
  const openChat = intent => {
    W.classList.add("open");
    if (wchat.childElementCount && !intent) return;
    wchat.innerHTML = "";
    if (!intent) return step("start");
    if (intent.startsWith("local:")) return step(intent, `Hola, quiero hacer un pedido en ${LOCALES.find(l => l.id === intent.slice(6)).n}`);
    const [k, t] = INTENT[intent] || ["start"];
    step(k, t);
  };
  document.addEventListener("click", e => {
    const b = e.target.closest("[data-chat]");
    if (!b) return;
    e.preventDefault();
    openChat(b.dataset.chat || "");
  });
  $("#wclose").onclick = () => W.classList.remove("open");
  addEventListener("keydown", e => { if (e.key === "Escape") { W.classList.remove("open"); mm.classList.remove("open"); } });
})();
