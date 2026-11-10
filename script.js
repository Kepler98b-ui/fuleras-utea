/* ==========================================================
   FULERAS UTEA — script.js
   1. Datos de ejemplo        2. Utilidades
   3. Tarjetas y muros        4. Navegación entre vistas
   5. Formulario (div verde)  6. Arranque
   ========================================================== */
(function () {
  'use strict';

  /* ---------- 1. DATOS (edítalos a tu gusto) ---------- */
  var FACULTADES = ['Ingeniería', 'Ciencias de la Salud', 'Derecho', 'Ciencias Empresariales', 'Educación'];
  var FACULTAD_OTRA = 'Otra / Prefiero no decir';

  var SEDES = {
    andahuaylas: { nombre: 'Andahuaylas' },
    abancay:     { nombre: 'Abancay' },
    cusco:       { nombre: 'Cusco' }
  };

  var TIPOS = {
    confesion: { label: 'Confesión', icon: '🤫' },
    chisme:    { label: 'Chisme',    icon: '🔥' },
    crush:     { label: 'Crush',     icon: '💘' },
    meme:      { label: 'Meme',      icon: '😂' }
  };

  // Publicaciones de ejemplo (FICTICIAS). mins = hace cuántos minutos se publicó.
  var posts = [
    { id:'a1', sede:'andahuaylas', facultad:'Ingeniería', tipo:'confesion', mins:12, likes:128, coms:23,
      titulo:'El «ya casi termino» más largo de la historia',
      texto:'Le dije a mi grupo que ya casi terminaba mi parte del trabajo. Todavía no abro el Word. Se entrega mañana. Confío en mí, en Dios y en la cafeína, en ese orden.' },
    { id:'a2', sede:'andahuaylas', facultad:'Ciencias de la Salud', tipo:'crush', mins:45, likes:96, coms:31,
      titulo:'Busco al del lapicero azul',
      texto:'Al chico de la tercera fila que siempre me presta lapicero y nunca lo pide de vuelta: o eres muy generoso o esto es una estrategia. Si es lo segundo, funciona. Si es lo primero, también.' },
    { id:'a3', sede:'andahuaylas', facultad:'Derecho', tipo:'chisme', mins:130, likes:210, coms:54,
      titulo:'Capítulo 87 del grupo de WhatsApp de la sección',
      texto:'Hoy alguien dejó en visto al delegado y el delegado lo anunció en clase como si fuera comunicado oficial. Merecemos una novela de las nueve con esto.' },
    { id:'a4', sede:'andahuaylas', facultad:'Ciencias Empresariales', tipo:'meme', mins:300, likes:340, coms:41,
      titulo:'Trabajo grupal: edición realista',
      texto:'5 integrantes.\n1 trabaja.\n1 expone.\n3 dan «apoyo moral».\nNota final: 20 para todos.' },
    { id:'a5', sede:'andahuaylas', facultad:'Educación', tipo:'confesion', mins:1500, likes:77, coms:9,
      titulo:'Asentir también es una habilidad',
      texto:'Confieso que llevo un semestre asintiendo con la cabeza en clase sin entender nada. Me va mejor que a varios que sí entienden.' },

    { id:'b1', sede:'abancay', facultad:'Ingeniería', tipo:'confesion', mins:25, likes:143, coms:19,
      titulo:'En mi laptop sí funcionaba',
      texto:'Mi programa funcionaba perfecto hasta que lo mostré en clase. Misterios de la ciencia, del universo y de la entrega de las 11:59 p. m.' },
    { id:'b2', sede:'abancay', facultad:'Ciencias de la Salud', tipo:'chisme', mins:75, likes:188, coms:36,
      titulo:'Las guardias dan para novela',
      texto:'Dicen que en las prácticas nacen más romances que en una telenovela. Yo solo sé que a las 3 a. m. todo el mundo se ve más guapo y más cansado. Ambas cosas son ciertas.' },
    { id:'b3', sede:'abancay', facultad:'Derecho', tipo:'confesion', mins:210, likes:88, coms:14,
      titulo:'Subrayé todo el libro',
      texto:'Subrayé el libro entero con cuatro colores. Ahora no se entiende ni el libro ni el sistema de colores. Estudiar con método, dicen.' },
    { id:'b4', sede:'abancay', facultad:'Ciencias Empresariales', tipo:'crush', mins:600, likes:119, coms:47,
      titulo:'Para la del cuaderno de stickers',
      texto:'Para la chica que se sienta cerca de la ventana y siempre llega corriendo con una sonrisa: tu llegada tarde es lo mejor de mi mañana. Ya, lo dije.' },
    { id:'b5', sede:'abancay', facultad:'Educación', tipo:'meme', mins:2000, likes:231, coms:28,
      titulo:'Entrega libre',
      texto:'Profe: «Entrega libre».\nYo: entiendo «entrega nunca».\nProfe: «Es para hoy».\nYo: 🫠' },

    { id:'c1', sede:'cusco', facultad:'Ingeniería', tipo:'chisme', mins:8, likes:175, coms:28,
      titulo:'Frío cusqueño, motivación cero',
      texto:'Los lunes en Cusco: frío, cuesta y ganas de nada. Mi motivación llega a las 2 p. m. junto con el solcito. Antes de eso, solo soy un cuerpo en clase.' },
    { id:'c2', sede:'cusco', facultad:'Educación', tipo:'crush', mins:95, likes:201, coms:62,
      titulo:'Gracias por la sombrilla',
      texto:'A quien me dejó entrar a su sombrilla cuando cayó el aguacero: sé que solo fue amabilidad, pero mi corazón no entiende de protocolos.' },
    { id:'c3', sede:'cusco', facultad:'Ciencias de la Salud', tipo:'confesion', mins:400, likes:92, coms:12,
      titulo:'Mi relación con el café',
      texto:'Confieso que mi personalidad es 70 % café y 30 % «ya veremos». El semestre avanza y la proporción no mejora.' },
    { id:'c4', sede:'cusco', facultad:'Derecho', tipo:'meme', mins:800, likes:266, coms:33,
      titulo:'Mood en exposiciones',
      texto:'Exposición en 5 minutos.\nYo: ensayé 0 veces.\nTambién yo: «Con permiso, voy a improvisar con mucha seguridad».' },
    { id:'c5', sede:'cusco', facultad:'Ciencias Empresariales', tipo:'chisme', mins:3000, likes:154, coms:22,
      titulo:'La cola del fotocopiado, ese lugar de la verdad',
      texto:'Dicen que en la cola del fotocopiado uno se entera de todo: notas, parejas, exámenes sorpresa. Más información que cualquier comunicado oficial, y gratis.' }
  ];

  var filtros = { andahuaylas: 'Todas', abancay: 'Todas', cusco: 'Todas' };
  var chipRefs = { andahuaylas: [], abancay: [], cusco: [] };

  /* ---------- 2. UTILIDADES ---------- */
  function $(sel, root) { return (root || document).querySelector(sel); }
  function $$(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }

  // Crea un elemento usando textContent (evita inyectar HTML)
  function h(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text !== undefined && text !== null) e.textContent = text;
    return e;
  }

  function timeAgo(mins) {
    if (mins < 1) return 'justo ahora';
    if (mins < 60) return 'hace ' + mins + ' min';
    if (mins < 1440) return 'hace ' + Math.floor(mins / 60) + ' h';
    return 'hace ' + Math.floor(mins / 1440) + ' d';
  }

  function sortedPosts() {
    return posts.slice().sort(function (a, b) { return a.mins - b.mins; });
  }

  var toastTimer;
  function toast(msg) {
    var t = $('#toast');
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { t.classList.remove('show'); }, 2600);
  }

  /* ---------- 3. TARJETAS Y MUROS ---------- */
  function createCard(post, opts) {
    var card = h('article', 'card');

    var head = h('div', 'card__head');
    var avatar = h('span', 'avatar', '👻');
    avatar.setAttribute('aria-hidden', 'true');
    var who = h('div', 'card__who');
    who.appendChild(h('strong', 'card__name', 'Anónimo'));
    who.appendChild(h('span', 'card__time', ' · ' + timeAgo(post.mins)));
    head.appendChild(avatar);
    head.appendChild(who);
    card.appendChild(head);

    var badges = h('div', 'badges');
    if (opts.showSede) badges.appendChild(h('span', 'badge badge--sede', '📍 ' + SEDES[post.sede].nombre));
    badges.appendChild(h('span', 'badge', post.facultad));
    var tipo = TIPOS[post.tipo];
    badges.appendChild(h('span', 'badge badge--' + post.tipo, tipo.icon + ' ' + tipo.label));
    if (post.mine) badges.appendChild(h('span', 'badge badge--mine', 'Tu envío · solo visible en tu pantalla'));
    card.appendChild(badges);

    card.appendChild(h('h3', 'card__title', post.titulo));
    card.appendChild(h('p', post.tipo === 'meme' ? 'card__text card__text--meme' : 'card__text', post.texto));

    var actions = h('div', 'card__actions');

    // Botón 🔥 (da / quita fuego)
    var like = h('button', 'action');
    like.type = 'button';
    function paintLike() {
      like.textContent = '🔥 ' + post.likes;
      like.setAttribute('aria-pressed', String(!!post.liked));
      like.setAttribute('aria-label', (post.liked ? 'Quitar fuego. ' : 'Dar fuego. ') + post.likes + ' en total');
      like.classList.toggle('is-on', !!post.liked);
    }
    like.addEventListener('click', function () {
      post.liked = !post.liked;
      post.likes += post.liked ? 1 : -1;
      paintLike();
    });
    paintLike();
    actions.appendChild(like);

    actions.appendChild(h('span', 'stat-inline', '💬 ' + post.coms));
    actions.appendChild(h('span', 'spacer'));

    // Botón 🚩 Reportar
    var report = h('button', 'action', '🚩 Reportar');
    report.type = 'button';
    report.addEventListener('click', function () {
      report.disabled = true;
      report.textContent = '🚩 Reportado';
      toast('Gracias. Los admins la revisarán.');
    });
    actions.appendChild(report);

    card.appendChild(actions);
    return card;
  }

  function renderHome() {
    Object.keys(SEDES).forEach(function (s) {
      var n = posts.filter(function (p) { return p.sede === s; }).length;
      var el = $('[data-count="' + s + '"]');
      if (el) el.textContent = n + (n === 1 ? ' fulerita' : ' fuleritas');
    });
    var feed = $('#feed-inicio');
    feed.replaceChildren();
    sortedPosts().slice(0, 6).forEach(function (p) {
      feed.appendChild(createCard(p, { showSede: true }));
    });
  }

  function renderSede(sede) {
    var feed = $('[data-feed="' + sede + '"]');
    feed.replaceChildren();
    var f = filtros[sede];
    var lista = sortedPosts().filter(function (p) {
      return p.sede === sede && (f === 'Todas' || p.facultad === f);
    });

    if (!lista.length) {
      var vacio = h('div', 'card empty');
      vacio.appendChild(h('strong', null, '🦗 Silencio sospechoso…'));
      var p = h('p', null, 'Nadie ha chismeado de ' + f + ' en ' + SEDES[sede].nombre + ' todavía. ');
      var a = h('a', null, '¿Serás tú?');
      a.href = '#contacto';
      a.addEventListener('click', function () { $('#f-sede').value = sede; });
      p.appendChild(a);
      vacio.appendChild(p);
      feed.appendChild(vacio);
      return;
    }
    lista.forEach(function (p) { feed.appendChild(createCard(p, { showSede: false })); });
  }

  function setFiltro(sede, facultad) {
    filtros[sede] = facultad;
    chipRefs[sede].forEach(function (b) {
      b.setAttribute('aria-pressed', String(b.dataset.facultad === facultad));
    });
    renderSede(sede);
  }

  function buildChips(sede) {
    var box = $('[data-chips="' + sede + '"]');
    ['Todas'].concat(FACULTADES).forEach(function (f) {
      var b = h('button', 'chip', f);
      b.type = 'button';
      b.dataset.facultad = f;
      b.setAttribute('aria-pressed', String(f === 'Todas'));
      b.addEventListener('click', function () { setFiltro(sede, f); });
      box.appendChild(b);
      chipRefs[sede].push(b);
    });
  }

  /* ---------- 4. NAVEGACIÓN ENTRE VISTAS (sin recargar) ----------
     Los enlaces cambian el #hash; aquí se ocultan/muestran los divs. */
  var RUTAS = ['inicio', 'andahuaylas', 'abancay', 'cusco', 'reglas', 'contacto'];
  var TITULOS = {
    inicio: 'Fuleras UTEA | Confesiones, chismes y crushes · Andahuaylas, Abancay y Cusco',
    andahuaylas: 'Confesiones UTEA Andahuaylas | Fuleras UTEA',
    abancay: 'Chismes UTEA Abancay | Fuleras UTEA',
    cusco: 'Fuleras UTEA Cusco | Confesiones y chismes',
    reglas: 'Reglas | Fuleras UTEA',
    contacto: 'Contacto: envía tu chisme | Fuleras UTEA'
  };
  var primeraCarga = true;

  function mostrarVista(nombre) {
    $$('.view').forEach(function (v) { v.hidden = (v.id !== 'view-' + nombre); });

    $$('.main-nav a').forEach(function (a) {
      if (a.dataset.route === nombre) a.setAttribute('aria-current', 'page');
      else a.removeAttribute('aria-current');
    });
    var activo = $('.main-nav a[aria-current="page"]');
    if (activo && activo.scrollIntoView) activo.scrollIntoView({ block: 'nearest', inline: 'center' });

    if (nombre === 'inicio') renderHome();
    if (SEDES[nombre]) renderSede(nombre);

    document.title = TITULOS[nombre];
    window.scrollTo(0, 0);
    if (!primeraCarga) {
      var titulo = $('#view-' + nombre + ' h1');
      if (titulo) titulo.focus({ preventScroll: true });
    }
    primeraCarga = false;
  }

  function enrutar() {
    var hash = (location.hash || '').replace('#', '').toLowerCase();
    mostrarVista(RUTAS.indexOf(hash) !== -1 ? hash : 'inicio');
  }
  window.addEventListener('hashchange', enrutar);

  /* ---------- 5. FORMULARIO (div verde de éxito) ---------- */
  var form = $('#form-fulerita');
  var selSede = $('#f-sede');
  var selFac = $('#f-facultad');
  var txt = $('#f-texto');
  var contador = $('#f-count');
  var errBox = $('#form-error');
  var okBox = $('#form-success');
  var okTimer;

  // Llenar el selector de facultades
  (function () {
    var ph = document.createElement('option');
    ph.value = ''; ph.disabled = true; ph.selected = true; ph.textContent = 'Elige tu facultad…';
    selFac.appendChild(ph);
    FACULTADES.concat([FACULTAD_OTRA]).forEach(function (f) {
      var o = document.createElement('option');
      o.value = f; o.textContent = f;
      selFac.appendChild(o);
    });
  })();

  // Botones "Confesar desde X" preseleccionan la sede
  $$('[data-prefill-sede]').forEach(function (a) {
    a.addEventListener('click', function () { selSede.value = a.dataset.prefillSede; });
  });

  txt.addEventListener('input', function () { contador.textContent = txt.value.length; });

  // Al empezar a escribir otra vez, se esconde el aviso verde
  form.addEventListener('input', function () { okBox.hidden = true; });
  $('#success-close').addEventListener('click', function () { okBox.hidden = true; });

  function datosPersonales(s) {
    if (/[\w.+-]+@[\w-]+\.[\w.]+/.test(s)) return 'Parece que hay un correo electrónico. Quítalo: el anonimato también cuida a los demás.';
    if (/(?:\+?\d[\s-]?){7,}/.test(s)) return 'Parece que hay un número de teléfono o DNI. Quítalo, por favor.';
    if (/https?:\/\/|www\./i.test(s)) return 'Nada de enlaces. Cuéntalo con tus palabras.';
    if (/@\w{3,}/.test(s)) return 'Nada de usuarios de redes sociales. Si se puede identificar a alguien, no se publica.';
    return '';
  }

  function mostrarError(msg) {
    okBox.hidden = true;
    errBox.textContent = msg;
    errBox.hidden = false;
    errBox.scrollIntoView({ block: 'center', behavior: 'smooth' });
  }

  function mostrarExito() {
    okBox.hidden = false;
    okBox.scrollIntoView({ block: 'center', behavior: 'smooth' });
    clearTimeout(okTimer);
    okTimer = setTimeout(function () { okBox.hidden = true; }, 8000);
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    errBox.hidden = true;

    var data = {
      titulo: $('#f-titulo').value.trim(),
      sede: selSede.value,
      facultad: selFac.value,
      tipo: $('#f-tipo').value,
      texto: txt.value.trim()
    };

    if (!data.titulo || !data.sede || !data.facultad) return mostrarError('Faltan datos: completa título, sede y facultad.');
    if (data.texto.length < 10) return mostrarError('Cuéntanos un poquito más (mínimo 10 caracteres).');
    var problema = datosPersonales(data.titulo + ' ' + data.texto);
    if (problema) return mostrarError(problema);

    /* AQUÍ iría el envío real a un servidor/servicio de formularios:
       fetch('https://tu-servicio.com/enviar', {
         method: 'POST', headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify(data)
       });
       En esta versión (solo front-end) no se envía nada a ningún lado. */

    // Demo: el envío aparece en el muro, solo en tu pantalla
    if (data.tipo !== 'borrar') {
      posts.push({
        id: 'u' + Date.now(), sede: data.sede, facultad: data.facultad, tipo: data.tipo,
        titulo: data.titulo, texto: data.texto, mins: 0, likes: 0, coms: 0, mine: true
      });
      setFiltro(data.sede, 'Todas');
    }

    form.reset();               // limpia el formulario
    contador.textContent = '0';
    mostrarExito();             // div verde "Enviado con éxito"
  });

  /* ---------- 6. ARRANQUE ---------- */
  // Escudo: solo se muestra si el archivo assets/escudo-utea.png existe
  $$('.escudo').forEach(function (img) {
    function ok() { img.hidden = false; }
    img.addEventListener('load', ok);
    if (img.complete && img.naturalWidth > 0) ok();
  });

  Object.keys(SEDES).forEach(buildChips);
  $('#year').textContent = new Date().getFullYear();
  enrutar();
})();
