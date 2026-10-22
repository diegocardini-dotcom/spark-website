/* El Parmegiano — homepage concept interactions */
(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ── load + nav ── */
  requestAnimationFrame(() => document.documentElement.classList.add("is-loaded"));
  const nav = $("#nav");
  addEventListener("scroll", () => nav.classList.toggle("is-scrolled", scrollY > 10), { passive: true });
  const mm = $("#mmenu");
  $("#burger").onclick = () => mm.classList.add("open");
  $("#mclose").onclick = () => mm.classList.remove("open");
  $$("#mmenu a").forEach(a => a.onclick = () => mm.classList.remove("open"));

  /* ── reveals ── */
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
  }), { threshold: .12, rootMargin: "0px 0px -6% 0px" });
  $$(".rv, .clip").forEach(el => io.observe(el));

  /* ── parallax (franquicias) ── */
  const px = $("[data-parallax]");
  if (px && !reduce) {
    const tick = () => {
      const r = px.parentElement.getBoundingClientRect();
      const p = (r.top + r.height / 2 - innerHeight / 2) / innerHeight;
      px.style.transform = `translate3d(0, ${p * -60}px, 0)`;
    };
    addEventListener("scroll", tick, { passive: true }); tick();
  }

  /* ── locales ── */
  // h: [lun-sab intervals, domingo intervals] in "HH:MM-HH:MM"
  const LOCALES = [
    { id: "maschwitz", n: "Maschwitz", z: "escobar", a: "Colectora Este Ramal Escobar 2291", h: [["08:00-20:30"], ["09:00-13:30"]], t: "WhatsApp +54 9 11 6780-5439" },
    { id: "loma-verde", n: "Loma Verde", z: "escobar", a: "Colectora Este Ramal Escobar km 54,5", h: [["08:00-20:30"], ["09:00-13:30"]], t: "WhatsApp +54 9 11 4187-7122" },
    { id: "tortugas", n: "Tortugas", z: "escobar", a: "Golfers G.C. 3099 · Small Center Tortugas", h: [["09:00-21:00"], ["09:00-13:00"]], t: "WhatsApp +54 9 11 5946-3231" },
    { id: "pilar", n: "Pilar", z: "escobar", a: "Escala 45 · Colectora Este 9300, Ramal Pilar", h: [["09:00-20:30"], ["09:00-13:30"]], t: "WhatsApp +54 9 11 3945-5992" },
    { id: "zarate", n: "Zárate", z: "zc", a: "Independencia 902", h: [["09:00-13:30", "16:30-20:30"], []], t: "Tel. 0348 766-7119" },
    { id: "campana", n: "Campana", z: "zc", a: "San Martín 397", h: [["08:30-13:30", "16:30-20:30"], []], t: "Tel. 0348 963-7500" },
    { id: "martinez", n: "Martínez", z: "norte", a: "Av. Santa Fe 1598", h: [["09:00-20:00"], []], t: "Tel. 011 15-2778-2521" },
    { id: "punta-chica", n: "Punta Chica", z: "norte", a: "Av. del Libertador 2940", h: [["09:00-21:00"], ["09:00-13:30"]], t: "Tel. 11 3956-2856" },
    { id: "ituzaingo", n: "Ituzaingó", z: "oeste", a: "Gral. Félix Olazábal 668", h: [["09:00-21:00"], ["09:00-13:30"]], t: "WhatsApp +54 9 11 6805-4595" },
    { id: "devoto", n: "Devoto", z: "oeste", a: "Av. Francisco Beiro 5272, CABA", h: [["09:00-21:00"], ["09:00-13:00"]], t: "WhatsApp +54 9 11 3212-6301" },
  ];
  const ZONES = [["all", "Todos"], ["escobar", "Escobar · Pilar"], ["zc", "Zárate · Campana"], ["norte", "Zona Norte"], ["oeste", "Oeste · CABA"]];
  const ZLBL = Object.fromEntries(ZONES);

  const nowAR = () => {
    const p = Object.fromEntries(new Intl.DateTimeFormat("en-US", { timeZone: "America/Argentina/Buenos_Aires", weekday: "short", hour: "2-digit", minute: "2-digit", hour12: false }).formatToParts(new Date()).map(x => [x.type, x.value]));
    return { sun: p.weekday === "Sun", min: (+p.hour % 24) * 60 + +p.minute };
  };
  const toMin = s => { const [h, m] = s.split(":").map(Number); return h * 60 + m; };
  const status = l => {
    const { sun, min } = nowAR();
    const iv = l.h[sun ? 1 : 0];
    for (const r of iv) { const [a, b] = r.split("-").map(toMin); if (min >= a && min < b) return { open: true, txt: `Abierto · cierra ${r.split("-")[1].replace(/^0/, "")}` }; }
    const next = iv.map(r => r.split("-")[0]).find(a => toMin(a) > min);
    return { open: false, txt: next ? `Cerrado · abre ${next.replace(/^0/, "")}` : "Cerrado ahora" };
  };
  const hh = s => s.replaceAll(":00", "").replace(/\b0(\d)/g, "$1");
  const hoursTxt = l => `Lun a sáb ${hh(l.h[0].join(" y ").replaceAll("-", " a "))} hs` + (l.h[1].length ? ` · Dom ${hh(l.h[1][0].replace("-", " a "))} hs` : "");

  const pic = $("#locpic");
  LOCALES.forEach((l, i) => {
    const im = new Image(); im.src = `assets/img/local-${l.id}.jpg`; im.alt = `Local ${l.n}`; im.loading = "lazy"; im.dataset.id = l.id;
    if (i === 0) im.classList.add("on");
    pic.prepend(im);
  });
  const showPic = l => {
    $$("img", pic).forEach(im => im.classList.toggle("on", im.dataset.id === l.id));
    $("#lcName").textContent = l.n; $("#lcAddr").textContent = l.a;
    const s = status(l); const b = $("#lcBadge");
    b.textContent = s.open ? "Abierto" : "Cerrado"; b.className = "badge " + (s.open ? "badge--open" : "badge--closed");
    $$(".locrow").forEach(r => r.classList.toggle("on", r.dataset.id === l.id));
  };
  let zone = "all";
  const renderZones = () => {
    $("#zones").innerHTML = ZONES.map(([k, v]) => `<button class="chip ${k === zone ? "on" : ""}" data-z="${k}">${v}</button>`).join("");
    $$("#zones .chip").forEach(c => c.onclick = () => { zone = c.dataset.z; renderZones(); renderList(); });
  };
  const renderList = () => {
    const list = LOCALES.filter(l => zone === "all" || l.z === zone);
    $("#loclist").innerHTML = list.map(l => {
      const s = status(l);
      return `<div class="locrow" data-id="${l.id}">
        <div><h4>${l.n} <span class="badge ${s.open ? "badge--open" : "badge--closed"}">${s.txt}</span></h4>
        <p>${l.a}</p><p>${hoursTxt(l)}</p><span class="zone">${ZLBL[l.z]}</span></div>
        <button class="btn btn--ink" data-open-chat="local:${l.id}">Pedir acá <span class="arrow">→</span></button></div>`;
    }).join("");
    $$(".locrow").forEach(r => {
      const l = LOCALES.find(x => x.id === r.dataset.id);
      r.addEventListener("mouseenter", () => showPic(l));
      r.addEventListener("click", e => { if (!e.target.closest("button")) showPic(l); });
    });
    bindChatOpeners();
    if (list[0]) showPic(list[0]);
  };
  renderZones(); renderList();

  /* ── picada calculator ── */
  let gpp = 200;
  const ppl = $("#ppl");
  const fmtKg = g => (Math.round(g / 100) / 10).toLocaleString("es-AR", { minimumFractionDigits: 1, maximumFractionDigits: 1 });
  const calc = () => {
    const n = +ppl.value, g = n * gpp;
    ppl.style.setProperty("--p", ((n - 4) / 56 * 100) + "%");
    $("#pplN").textContent = n;
    $("#kg").textContent = `≈ ${fmtKg(g)} kg`;
    $("#tkKg").innerHTML = `${fmtKg(g)}<span style="font-size:28px"> kg</span>`;
    $("#tkTxt").textContent = `Para ${n} personas, ${gpp === 200 ? "como comida principal" : "de entrada"}.`;
    $("#rec").textContent = n >= 30 ? "Para tu evento: picada a medida, coordinada con el equipo." : n >= 16 ? "Te recomendamos la Picada A tu medida." : "Te recomendamos la Picada Clásica.";
  };
  ppl.addEventListener("input", calc);
  $$("#calc .seg button").forEach(b => b.onclick = () => { $$("#calc .seg button").forEach(x => x.classList.remove("on")); b.classList.add("on"); gpp = +b.dataset.g; calc(); });
  calc();

  /* ── chat engine ── */
  const clock = () => new Intl.DateTimeFormat("es-AR", { hour: "2-digit", minute: "2-digit", hour12: false }).format(new Date());
  const esc = s => s.replace(/[&<>]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c]));
  const wait = ms => new Promise(r => setTimeout(r, reduce ? Math.min(ms, 120) : ms));
  const push = (box, type, text) => {
    const el = document.createElement("div");
    el.className = "msg msg--" + type;
    el.innerHTML = type === "sys" ? esc(text) : `${esc(text).replace(/\*(.+?)\*/g, "<b>$1</b>")}<time>${clock()}${type === "out" ? " ✓✓" : ""}</time>`;
    box.appendChild(el); box.scrollTop = box.scrollHeight;
  };
  const typing = async (box, ms) => {
    const t = document.createElement("div"); t.className = "typing"; t.innerHTML = "<i></i><i></i><i></i>";
    box.appendChild(t); box.scrollTop = box.scrollHeight; await wait(ms); t.remove();
  };

  /* demo phone (autoplay loop when visible) */
  const DEMO = [
    ["out", "Hola! Quiero una picada para 12 para el sábado. Estoy por Pilar"],
    ["in", "¡Hola! 🧀 Para 12 personas como comida principal te recomiendo la *Picada Clásica* de unos 2,4 kg."],
    ["in", "¿La retirás en *El Parmegiano Pilar* (Escala 45) o te la enviamos?"],
    ["out", "Retiro, tipo 19 hs"],
    ["in", "Perfecto. El sábado Pilar está abierto de 9 a 20:30 hs. ¿A nombre de quién la dejo?"],
    ["out", "Lucía"],
    ["in", "¡Listo, Lucía! ✅ Tu pedido *#047* quedó confirmado para el sábado 19 hs en Pilar. Te aviso cuando esté lista."],
    ["sys", "Pedido #047 enviado al local Pilar · contacto guardado"],
  ];
  const demoBox = $("#demoChat");
  let demoRunning = false;
  const runDemo = async () => {
    if (demoRunning) return; demoRunning = true;
    while (true) {
      demoBox.innerHTML = "";
      for (const [type, txt] of DEMO) {
        if (type === "in") await typing(demoBox, 1100 + txt.length * 9);
        else await wait(type === "sys" ? 700 : 1200);
        push(demoBox, type, txt);
      }
      await wait(6500);
    }
  };
  if (document.documentElement.classList.contains("static")) DEMO.forEach(([t, x]) => push(demoBox, t, x));
  else new IntersectionObserver((es, o) => es.forEach(e => { if (e.isIntersecting) { runDemo(); o.disconnect(); } }), { threshold: .3 }).observe(demoBox);

  /* interactive widget */
  const W = $("#widget"), wchat = $("#wchat"), wqr = $("#wqr");
  const ctx = { local: null, order: 47 };
  const locByZone = z => LOCALES.filter(l => l.z === z);
  const locChips = (list, next) => list.map(l => [l.n, next + ":" + l.id]);
  const FLOWS = {
    start: () => (ctx.local = null, { bot: ["¡Hola! Soy Parme, el asistente de El Parmegiano 🧀", "¿En qué te ayudo?"], chips: [["Quiero una picada", "picada"], ["Hacer un pedido", "pedido"], ["¿Qué local me queda cerca?", "cerca"], ["Soy comercio (mayorista)", "mayorista"], ["Franquicias", "franquicia"]] }),
    picada: () => ({ bot: ["¡Buenísimo! ¿Para cuántas personas es?"], chips: [["Hasta 6", "p:6"], ["Entre 8 y 15", "p:12"], ["Es un evento, +30", "evento"]] }),
    p: n => ({ bot: [`Para ${n} personas como comida principal te recomiendo la *Picada Clásica*, unos ${fmtKg(n * 200)} kg entre fiambres y quesos.`, "¿La retirás en un local o te la enviamos?"], chips: [["Retiro en un local", "retiro"], ["Envío a domicilio", "envio"]], set: { item: `Picada Clásica (${fmtKg(n * 200)} kg)` } }),
    evento: () => ({ bot: ["Para eventos armamos la picada a medida y coordinamos la entrega 🙌", "Te paso con el equipo de eventos para cotizarla. ¿Para qué fecha es?"], chips: [["Este mes", "ev-ok"], ["Más adelante", "ev-ok"]] }),
    "ev-ok": () => ({ bot: ["¡Anotado! Una persona del equipo de eventos te escribe por acá en minutos para armar la propuesta."], sys: "Lead evento creado · asignado a Eventos (casa central)", chips: [["Volver al inicio", "start"]] }),
    pedido: () => ({ bot: ["Pasame la lista como en el mostrador, por ejemplo: _300 g de jamón crudo, 200 g de tybo_. ¿Probamos?"], chips: [["Enviar un pedido de ejemplo", "pedido-ej"]] }),
    "pedido-ej": () => ({ user: "250 g de jamón crudo, 300 g de queso tybo, aceitunas y un Malbec", bot: ["Anotado ✍️", "• 250 g jamón crudo\n• 300 g queso tybo\n• Aceitunas\n• 1 vino Malbec", "¿En qué local lo retirás?"], chips: [["Retiro en un local", "retiro"], ["Envío a domicilio", "envio"]], set: { item: "Pedido de fiambrería" } }),
    retiro: () => ctx.local ? FLOWS.conf(ctx.local.id) : ({ bot: ["¿En qué zona te queda mejor?"], chips: ZONES.slice(1).map(([k, v]) => [v, "rz:" + k]) }),
    rz: z => ({ bot: ["Elegí el local:"], chips: locChips(locByZone(z), "conf") }),
    local: id => { const l = LOCALES.find(x => x.id === id); ctx.local = l; return { bot: [`¡Perfecto! Te atiendo para *El Parmegiano ${l.n}* (${l.a}). ${status(l).txt}.`, "¿Qué querés pedir?"], chips: [["Una picada", "picada"], ["Un pedido de fiambrería", "pedido-ej"]] }; },
    conf: id => { const l = LOCALES.find(x => x.id === id); const n = ++ctx.order; return { bot: [`¡Listo! ✅ Tu pedido *#0${n}* quedó cargado en *${l.n}*. Te aviso por acá cuando esté listo para retirar.`], sys: `Pedido #0${n} → equipo de ${l.n} · notificado`, chips: [["Volver al inicio", "start"]] }; },
    envio: () => ({ bot: ["¿En qué zona estás?"], chips: ZONES.slice(1).map(([k, v]) => [v, "ez:" + k]) }),
    ez: z => { const l = locByZone(z)[0]; const n = ++ctx.order; return { bot: [`Te cubre *El Parmegiano ${l.n}*. Una persona del local te confirma el horario de entrega en minutos.`], sys: `Pedido #0${n} con envío → ${l.n} · pendiente de confirmar`, chips: [["Volver al inicio", "start"]] }; },
    cerca: () => ({ bot: ["Contame en qué zona estás 📍"], chips: ZONES.slice(1).map(([k, v]) => [v, "cz:" + k]) }),
    cz: z => ({ bot: ["Estos son los locales de esa zona:", ...locByZone(z).map(l => `*${l.n}*: ${l.a}. ${status(l).txt}.`)], chips: [["Hacer un pedido", "retiro"], ["Volver al inicio", "start"]] }),
    mayorista: () => ({ bot: ["¡Genial! Trabajamos con supermercados, almacenes, carnicerías, fiambrerías y todo tipo de comercios.", "¿Qué tipo de comercio tenés?"], chips: [["Almacén", "my2"], ["Supermercado", "my2"], ["Carnicería / fiambrería", "my2"], ["Gastronomía / catering", "my2"]] }),
    my2: () => ({ bot: ["¿Y en qué zona estás?"], chips: ZONES.slice(1).map(([k, v]) => [v, "my3"]) }),
    my3: () => ({ bot: ["¡Gracias! Te asigné un vendedor de la distribuidora. Te escribe hoy dentro del horario comercial con la lista de precios 📋"], sys: "Lead mayorista · etapa Nuevo · asignado a Ventas", chips: [["Volver al inicio", "start"]] }),
    franquicia: () => ({ bot: ["¡Qué bueno que te interese sumarte! 🙌", "¿En qué zona te gustaría abrir tu Parmegiano?"], chips: [["Zona Norte", "fr2"], ["Zona Oeste", "fr2"], ["CABA", "fr2"], ["Otra provincia", "fr2"]] }),
    fr2: () => ({ bot: ["¿Ya tenés un local o estás buscando?"], chips: [["Ya tengo local", "fr3"], ["Estoy buscando", "fr3"]] }),
    fr3: () => ({ bot: ["¡Perfecto! Le paso tus datos al equipo de expansión en casa central (Escobar). Te contactan para una primera charla y te mandan el dossier de franquicias."], sys: "Lead franquicia · pipeline Expansión · casa central", chips: [["Volver al inicio", "start"]] }),
  };
  let busy = false;
  const step = async (key, userText) => {
    if (busy) return; busy = true;
    wqr.innerHTML = "";
    const [k, arg] = key.split(":");
    const f = FLOWS[k](arg && isNaN(arg) ? arg : arg ? +arg : undefined);
    const ut = f.user || userText;
    if (ut) { push(wchat, "out", ut); await wait(500); }
    for (const b of f.bot) { await typing(wchat, 650 + b.length * 7); push(wchat, "in", b.replace(/_(.+?)_/g, "$1")); }
    if (f.sys) { await wait(450); push(wchat, "sys", f.sys); }
    wqr.innerHTML = f.chips.map(([l, n]) => `<button data-n="${n}">${l}</button>`).join("");
    $$("button", wqr).forEach(b => b.onclick = () => step(b.dataset.n, b.textContent));
    busy = false;
  };
  const openChat = async intent => {
    W.classList.add("open");
    if (!wchat.childElementCount || intent) {
      wchat.innerHTML = "";
      if (!intent) return step("start");
      if (intent.startsWith("local:")) return step(intent, `Hola! Quiero hacer un pedido en ${LOCALES.find(l => l.id === intent.slice(6)).n}`);
      const map = { picada: ["picada", "Hola! Quiero pedir una picada"], mayorista: ["mayorista", "Hola! Tengo un comercio y quiero comprar por mayor"], franquicia: ["franquicia", "Hola! Quiero info de franquicias"] };
      const [k, t] = map[intent] || ["start"];
      step(k, t);
    }
  };
  function bindChatOpeners() {
    $$("[data-open-chat]").forEach(b => { if (b._b) return; b._b = 1; b.addEventListener("click", e => { e.preventDefault(); openChat(b.dataset.openChat || ""); }); });
  }
  bindChatOpeners();
  $("#wclose").onclick = () => W.classList.remove("open");
  addEventListener("keydown", e => { if (e.key === "Escape") { W.classList.remove("open"); mm.classList.remove("open"); } });
})();
