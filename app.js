/* ============================================================
   Usamos boostrap porque es mejor malo conocido q malo por conocer...
   app.js – Municipalidad de Cholchol
   Convenciones: camelCase para variables/funciones,
                 UPPER_SNAKE_CASE para constantes de datos.
   Organización: módulos autocontenidos (IIFE) + funciones
                 globales de utilidad.
   Ciclo de vida: inicialización en DOMContentLoaded.
   ============================================================ */

'use strict';

/* ============================================================
   SECCIÓN 1 – DATOS DE APLICACIÓN
   Patrón: separación de datos y presentación (CE7)
   ============================================================ */

/** @type {Array<Object>} Catálogo de servicios municipales */
const SERVICIOS = [
  {
    id:          'circulacion',
    icono:       'bi-car-front-fill',
    titulo:      'Permiso de Circulación',
    descripcion: 'Pago en línea rápido y seguro.',
    detalle:     'Renueva o paga tu permiso de circulación sin salir de casa. Disponible en línea durante todo el año. Ten a mano la patente y el RUT del propietario.',
    url:         'https://cholcholpagos.insico.cl/PermisoCirculacion'
  },
  {
    id:          'transparencia',
    icono:       'bi-eye-fill',
    titulo:      'Transparencia',
    descripcion: 'Acceso a información pública.',
    detalle:     'Consulta actos administrativos, contratos, presupuesto y más a través del Portal de Transparencia del Estado.',
    url:         'https://www.portaltransparencia.cl/PortalPdT/directorio-de-organismos-regulados/?org=MU045'
  },
  {
    id:          'sai',
    icono:       'bi-file-earmark-text-fill',
    titulo:      'Solicitar Información',
    descripcion: 'Sistema SAI – Ley 20.285.',
    detalle:     'Realiza solicitudes de acceso a información pública. Tu solicitud será respondida en un máximo de 20 días hábiles.',
    url:         'https://www.portaltransparencia.cl/PortalPdT/ingreso-sai-v2?idOrg=498'
  },
  {
    id:          'lobby',
    icono:       'bi-building-fill',
    titulo:      'Ley Lobby',
    descripcion: 'Audiencias con autoridades.',
    detalle:     'Conoce las reuniones y audiencias de las autoridades municipales conforme a la Ley 20.730.',
    url:         'https://www.leylobby.gob.cl/instituciones/MU045'
  },
  {
    id:          'dideco',
    icono:       'bi-people-fill',
    titulo:      'Programas Sociales',
    descripcion: 'DIDECO y apoyo comunitario.',
    detalle:     'La Dirección de Desarrollo Comunitario (DIDECO) ofrece programas de becas, subsidios y talleres para la comunidad.',
    url:         '#contacto'
  },
  {
    id:          'obras',
    icono:       'bi-hammer',
    titulo:      'Obras Municipales',
    descripcion: 'Permisos de construcción.',
    detalle:     'Tramita permisos de edificación, recepciones de obra y certificados de urbanización a través de la DOM.',
    url:         '#contacto'
  }
];

/** @type {Array<Object>} Noticias municipales */
const NOTICIAS = [
  {
    categoria: 'social',
    titulo:    '100 jóvenes de Cholchol reciben becas para educación superior 2025',
    fecha:     '15 mayo 2025',
    icono:     '🎓'
  },
  {
    categoria: 'municipio',
    titulo:    'Municipio rinde homenaje a dirigentes que lucharon por la autonomía comunal',
    fecha:     '02 mayo 2025',
    icono:     '🏛️'
  },
  {
    categoria: 'obras',
    titulo:    'Inicio de obras de pavimentación en sector Lo Pequeño',
    fecha:     '28 abril 2025',
    icono:     '🏗️'
  },
  {
    categoria: 'cultura',
    titulo:    'We Tripantu 2025: Municipio invita a celebrar el Año Nuevo Mapuche',
    fecha:     '20 abril 2025',
    icono:     '🌟'
  },
  {
    categoria: 'social',
    titulo:    'DIDECO inicia programa de apoyo a adultos mayores en toda la comuna',
    fecha:     '10 abril 2025',
    icono:     '❤️'
  },
  {
    categoria: 'obras',
    titulo:    'Nuevo centro comunitario en construcción para el sector de Quilquilco',
    fecha:     '01 abril 2025',
    icono:     '🏠'
  }
];

/** @type {Array<Object>} Índice de búsqueda del sitio */
const SEARCH_INDEX = [
  { texto: 'Permiso de Circulación',     href: 'https://cholcholpagos.insico.cl/PermisoCirculacion' },
  { texto: 'Transparencia Activa',       href: 'https://www.portaltransparencia.cl/PortalPdT/directorio-de-organismos-regulados/?org=MU045' },
  { texto: 'Solicitar Información (SAI)',href: 'https://www.portaltransparencia.cl/PortalPdT/ingreso-sai-v2?idOrg=498' },
  { texto: 'Formulario de Contacto',     href: '#contacto' },
  { texto: 'Noticias Municipales',       href: '#noticias' },
  { texto: 'Programa de Becas',          href: '#noticias' },
  { texto: 'Obras Municipales (DOM)',    href: '#servicios' },
  { texto: 'Programas Sociales DIDECO', href: '#servicios' },
  { texto: 'Ley Lobby',                 href: 'https://www.leylobby.gob.cl/instituciones/MU045' },
  { texto: 'Autoridades Municipales',   href: '#autoridades' }
];

/* ============================================================
   SECCIÓN 2 – UTILIDADES GLOBALES
   ============================================================ */

/**
 * Muestra un toast de notificación en pantalla.
 * crea elementos, CE3: inserta/elimina del DOM.
 * @param {string}                         mensaje
 * @param {'success' | 'error' | 'info'}   tipo
 */
function mostrarToast(mensaje, tipo) {
  const contenedor = document.getElementById('toastContainer');
  if (!contenedor) return;

  const toast = document.createElement('div');
  toast.className   = `app-toast toast-${tipo}`;
  toast.textContent = mensaje;
  toast.setAttribute('role', 'status');
  toast.setAttribute('aria-live', 'polite');

  contenedor.appendChild(toast); // agregar al DOM

  // Disparar animación en siguiente frame
  requestAnimationFrame(() => {
    requestAnimationFrame(() => toast.classList.add('show'));
  });

  // CE3: eliminar del DOM después de 3.5 s
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400);
  }, 3500);
}

/**
 * Activa el observer de animaciones reveal para elementos nuevos.
 * IntersectionObserver como evento de ciclo de vida. CE3: añade clase.
 */
function iniciarRevealObserver() {
  const elementos = document.querySelectorAll('.reveal:not(.visible)');
  if (!elementos.length) return;

  const observer = new IntersectionObserver((entradas) => {
    entradas.forEach((entrada) => {
      if (entrada.isIntersecting) {
        entrada.target.classList.add('visible'); // modificar clase
        observer.unobserve(entrada.target);
      }
    });
  }, { threshold: 0.15 });

  elementos.forEach((el) => observer.observe(el));
}

/* ============================================================
   SECCIÓN 3 – MÓDULO: NAVBAR SCROLL
    evento scroll
    agrega/quita clase al elemento nav
   ============================================================ */
(function iniciarNavbarScroll() {
  const nav = document.getElementById('mainNav');
  if (!nav) return;

  /** Actualiza clase del navbar según posición de scroll */
  function actualizarNavbar() {
    nav.classList.toggle('nav-scrolled', window.scrollY > 60); // toggle de clase
  }

  window.addEventListener('scroll', actualizarNavbar, { passive: true }); // scroll
  actualizarNavbar();
})();

/* ============================================================
   SECCIÓN 4 – MÓDULO: DARK MODE TOGGLE
    evento click
    modifica atributo data-bs-theme en <html>
   ============================================================ */
(function iniciarTemaOscuro() {
  const toggleBtn  = document.getElementById('themeToggle');
  const themeIcon  = document.getElementById('themeIcon');
  const htmlEl     = document.documentElement;
  if (!toggleBtn) return;

  const temaGuardado = localStorage.getItem('cholchol-tema') || 'light';
  aplicarTema(temaGuardado);

  // click event
  toggleBtn.addEventListener('click', () => {
    const temaActual = htmlEl.getAttribute('data-bs-theme');
    const nuevoTema  = temaActual === 'light' ? 'dark' : 'light';
    aplicarTema(nuevoTema);
    localStorage.setItem('cholchol-tema', nuevoTema);
    mostrarToast(nuevoTema === 'dark' ? '🌙 Modo oscuro activado' : '☀️ Modo claro activado', 'info');
  });

  /**
   * Aplica el tema y actualiza el ícono.
   * @param {string} tema - 'light' | 'dark'
   */
  function aplicarTema(tema) {
    htmlEl.setAttribute('data-bs-theme', tema);            //  modificar atributo
    themeIcon.className = tema === 'dark'
      ? 'bi bi-sun-fill'
      : 'bi bi-moon-stars-fill';
  }
})();

/* ============================================================
   SECCIÓN 5 – MÓDULO: BACK TO TOP
    scroll + click
    toggle de clase 'visible'
   ============================================================ */
(function iniciarBackToTop() {
  const boton = document.getElementById('backToTop');
  if (!boton) return;

  // scroll event
  window.addEventListener('scroll', () => {
    boton.classList.toggle('visible', window.scrollY > 400); // CE3: toggle de clase
  }, { passive: true });

  // click event
  boton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();

/* ============================================================
   SECCIÓN 6 – MÓDULO: DISMISS ALERT
    click
    elimina elemento del DOM
   ============================================================ */
(function iniciarAlertaDismiss() {
  const btnDismiss  = document.getElementById('dismissAlert');
  const alertBanner = document.getElementById('alertBanner');
  if (!btnDismiss || !alertBanner) return;

  // click event
  btnDismiss.addEventListener('click', () => {
    alertBanner.style.opacity   = '0';
    alertBanner.style.maxHeight = '0';
    alertBanner.style.overflow  = 'hidden';
    setTimeout(() => {
      alertBanner.remove(); // eliminar nodo del DOM
      mostrarToast('Aviso cerrado', 'info');
    }, 400);
  });
})();

/* ============================================================
   SECCIÓN 7 – MÓDULO: BÚSQUEDA DINÁMICA
    input event
    inserta y limpia resultados en el DOM
   ============================================================ */
(function iniciarBuscador() {
  const inputBuscar = document.getElementById('searchInput');
  const resultados  = document.getElementById('searchResults');
  if (!inputBuscar || !resultados) return;

  // input event (teclado)
  inputBuscar.addEventListener('input', function () {
    const consulta = this.value.trim().toLowerCase();

    resultados.innerHTML     = ''; // vaciar DOM
    resultados.style.display = 'none';

    if (consulta.length < 2) return;

    const coincidencias = SEARCH_INDEX.filter(
      (item) => item.texto.toLowerCase().includes(consulta)
    );
    if (!coincidencias.length) return;

    // insertar resultados en el DOM
    coincidencias.forEach((item) => {
      const div       = document.createElement('div');
      div.className   = 'search-result-item';
      div.setAttribute('role', 'option');
      div.innerHTML   = `<i class="bi bi-search" aria-hidden="true"></i> ${item.texto}`;

      div.addEventListener('click', () => { //  click
        window.location.href     = item.href;
        resultados.style.display = 'none';
        inputBuscar.value        = '';
      });
      resultados.appendChild(div);
    });

    resultados.style.display = 'block';
  });

  // click fuera para cerrar
  document.addEventListener('click', (e) => {
    if (!inputBuscar.contains(e.target) && !resultados.contains(e.target)) {
      resultados.style.display = 'none';
    }
  });
})();

/* ============================================================
   SECCIÓN 8 – MÓDULO: RENDER DE SERVICIOS
   Patrón container/presenter: datos en SERVICIOS, render aquí.
   click + mouseover/mouseout + keydown
   genera tarjetas dinámicamente, actualiza modal
   ============================================================ */
(function renderizarServicios() {
  const grid = document.getElementById('serviceGrid');
  if (!grid) return;

  const modalEl    = document.getElementById('servicioModal');
  const modal      = modalEl ? new bootstrap.Modal(modalEl) : null;
  const modalLabel = document.getElementById('servicioModalLabel');
  const modalBody  = document.getElementById('servicioModalBody');
  const modalLink  = document.getElementById('servicioModalLink');

  SERVICIOS.forEach((servicio) => {
    /* --- Crear columna Bootstrap --- */
    const col       = document.createElement('div');
    col.className   = 'col-6 col-md-4 col-lg-2 reveal';

    /* --- Crear tarjeta --- */
    const card      = document.createElement('div');
    card.className  = 'service-card';
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', '0');
    card.setAttribute('aria-label', `Ver detalles de ${servicio.titulo}`);

    card.innerHTML = `
      <div class="service-icon"><i class="bi ${servicio.icono}" aria-hidden="true"></i></div>
      <h5>${servicio.titulo}</h5>
      <p>${servicio.descripcion}</p>
    `;

    /* click → abre modal con datos actualizados  */
    card.addEventListener('click', () => {
      if (!modal) return;
      modalLabel.textContent = servicio.titulo;        // actualizar texto
      modalBody.innerHTML    = `<p>${servicio.detalle}</p>`; // actualizar HTML
      modalLink.href         = servicio.url;           // actualizar atributo
      modal.show();
    });

    /* keydown – accesibilidad por teclado */
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        card.click();
      }
    });

    /* mouseover / mouseout */
    card.addEventListener('mouseover', () => {
      card.style.borderColor = 'var(--clr-accent)';
    });
    card.addEventListener('mouseout', () => {
      card.style.borderColor = 'transparent';
    });

    col.appendChild(card);
    grid.appendChild(col); // insertar en DOM
  });
})();

/* ============================================================
   SECCIÓN 9 – MÓDULO: FILTRO DE NOTICIAS
    click en filtros
    limpia y regenera tarjetas de noticias
   ============================================================ */
(function iniciarFiltroNoticias() {
  const grid         = document.getElementById('newsGrid');
  const mensajeVacio = document.getElementById('noNewsMsg');
  const filtros      = document.querySelectorAll('.filter-btn');
  if (!grid) return;

  const CAT_LABELS = {
    municipio: 'Municipio',
    social:    'Social',
    obras:     'Obras',
    cultura:   'Cultura'
  };

  renderizarNoticias('all'); // Render inicial

  // click en cada botón de filtro
  filtros.forEach((btn) => {
    btn.addEventListener('click', function () {
      filtros.forEach((b) => {
        b.classList.remove('active-filter'); // quitar clase
        b.setAttribute('aria-pressed', 'false');
      });
      this.classList.add('active-filter');   // agregar clase
      this.setAttribute('aria-pressed', 'true');
      renderizarNoticias(this.dataset.filter);
    });
  });

  /**
   * Limpia el grid y renderiza noticias según el filtro activo.
   * @param {string} filtro - 'all' o nombre de categoría
   */
  function renderizarNoticias(filtro) {
    grid.innerHTML = ''; // vaciar DOM

    const lista = filtro === 'all'
      ? NOTICIAS
      : NOTICIAS.filter((n) => n.categoria === filtro);

    if (!lista.length) {
      mensajeVacio.style.display = 'block';
      return;
    }
    mensajeVacio.style.display = 'none';

    lista.forEach((noticia) => {
      const col     = document.createElement('div');
      col.className = 'col-md-6 col-lg-4 reveal';

      col.innerHTML = `
        <article class="news-card" aria-label="Noticia: ${noticia.titulo}">
          <div class="news-img-wrap" aria-hidden="true">${noticia.icono}</div>
          <div class="news-body">
            <span class="news-category cat-${noticia.categoria}">
              ${CAT_LABELS[noticia.categoria] || noticia.categoria}
            </span>
            <h5>${noticia.titulo}</h5>
            <div class="news-date">
              <i class="bi bi-calendar3" aria-hidden="true"></i>
              <time datetime="2025">${noticia.fecha}</time>
            </div>
          </div>
        </article>
      `;

      grid.appendChild(col); // insertar en DOM
    });

    iniciarRevealObserver();
  }
})();

/* ============================================================
   SECCIÓN 10 – MÓDULO: CONTADORES ANIMADOS
    IntersectionObserver (ciclo de vida del componente)
    actualiza textContent en cada frame
   ============================================================ */
(function iniciarContadores() {
  const DURACION_MS = 2000;
  const seccion     = document.getElementById('estadisticas');
  if (!seccion) return;

  let yaAnimado = false;

  /**
   * Anima un número desde 0 hasta el valor objetivo.
   * @param {HTMLElement} elemento
   * @param {number}      objetivo
   */
  function animarContador(elemento, objetivo) {
    let inicio = null;

    function paso(timestamp) {
      if (!inicio) inicio = timestamp;
      const progreso    = Math.min((timestamp - inicio) / DURACION_MS, 1);
      const valorActual = Math.floor(progreso * objetivo);

      elemento.textContent = valorActual.toLocaleString('es-CL'); // actualizar texto

      if (progreso < 1) {
        requestAnimationFrame(paso);
      } else {
        elemento.textContent = objetivo.toLocaleString('es-CL');
      }
    }
    requestAnimationFrame(paso);
  }

  // IntersectionObserver – evento de ciclo de vida
  const observer = new IntersectionObserver((entradas) => {
    if (entradas[0].isIntersecting && !yaAnimado) {
      yaAnimado = true;
      document.querySelectorAll('.stat-number').forEach((el) => {
        const objetivo = parseInt(el.getAttribute('data-target'), 10);
        animarContador(el, objetivo);
      });
    }
  }, { threshold: 0.4 });

  observer.observe(seccion);
})();

/* ============================================================
   SECCIÓN 11 – MÓDULO: FORMULARIO DE CONTACTO
   validaciones en tiempo real con mensajes de error/éxito
   input, blur, change, submit, click
   modifica clases, mensajes y visibilidad de secciones
   ============================================================ */
(function iniciarFormularioContacto() {
  const form        = document.getElementById('contactForm');
  const submitBtn   = document.getElementById('submitBtn');
  const formSuccess = document.getElementById('formSuccess');
  const resetBtn    = document.getElementById('resetFormBtn');
  if (!form) return;

  /* ---- Expresiones regulares  ---- */
  const REGEX_EMAIL    = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  const REGEX_TELEFONO = /^(\+?56)?[\s-]?9[\s-]?\d{4}[\s-]?\d{4}$/;

  /**
   * Aplica estado de validación a un campo y muestra feedback.
   * modifica clases CSS y textContent del mensaje.
   * @param {HTMLElement} campo
   * @param {HTMLElement} contenedorFeedback
   * @param {boolean}     esValido
   * @param {string}      mensajeError
   */
  function mostrarEstadoCampo(campo, contenedorFeedback, esValido, mensajeError) {
    campo.classList.remove('is-valid', 'is-invalid');
    contenedorFeedback.className = 'field-feedback';

    if (esValido) {
      campo.classList.add('is-valid');
      contenedorFeedback.className   = 'field-feedback success';
      contenedorFeedback.textContent = '✓ Correcto';
    } else {
      campo.classList.add('is-invalid');
      contenedorFeedback.className   = 'field-feedback error';
      contenedorFeedback.textContent = mensajeError;
    }
  }

  /* ---- Funciones de validación individuales  ---- */

  function validarNombre() {
    const campo    = document.getElementById('nombreInput');
    const feedback = document.getElementById('nombreFeedback');
    const valor    = campo.value.trim();
    if (!valor)           { mostrarEstadoCampo(campo, feedback, false, '⚠ El nombre es obligatorio.');                        return false; }
    if (valor.length < 3) { mostrarEstadoCampo(campo, feedback, false, '⚠ Debe tener al menos 3 caracteres.');               return false; }
    mostrarEstadoCampo(campo, feedback, true, ''); return true;
  }

  function validarRut() {
    const campo    = document.getElementById('rutInput');
    const feedback = document.getElementById('rutFeedback');
    const valor    = campo.value.trim();
    if (!valor)                               { mostrarEstadoCampo(campo, feedback, false, '⚠ El RUT es obligatorio.');                    return false; }
    const limpio = valor.replace(/[.\-]/g, '');
    if (limpio.length < 7 || limpio.length > 9) { mostrarEstadoCampo(campo, feedback, false, '⚠ RUT inválido (ej: 12.345.678-9).'); return false; }
    mostrarEstadoCampo(campo, feedback, true, ''); return true;
  }

  function validarEmail() {
    const campo    = document.getElementById('emailInput');
    const feedback = document.getElementById('emailFeedback');
    const valor    = campo.value.trim();
    if (!valor)                    { mostrarEstadoCampo(campo, feedback, false, '⚠ El correo es obligatorio.');                     return false; }
    if (!REGEX_EMAIL.test(valor))  { mostrarEstadoCampo(campo, feedback, false, '⚠ Correo inválido (ej: nombre@correo.cl).'); return false; }
    mostrarEstadoCampo(campo, feedback, true, ''); return true;
  }

  function validarTelefono() {
    const campo    = document.getElementById('telefonoInput');
    const feedback = document.getElementById('telefonoFeedback');
    const valor    = campo.value.trim();
    if (!valor) {
      campo.classList.remove('is-valid', 'is-invalid');
      feedback.className = 'field-feedback';
      return true; // Campo opcional
    }
    if (!REGEX_TELEFONO.test(valor)) { mostrarEstadoCampo(campo, feedback, false, '⚠ Teléfono inválido (ej: +56 9 1234 5678).'); return false; }
    mostrarEstadoCampo(campo, feedback, true, ''); return true;
  }

  function validarAsunto() {
    const campo    = document.getElementById('asuntoSelect');
    const feedback = document.getElementById('asuntoFeedback');
    if (!campo.value) { mostrarEstadoCampo(campo, feedback, false, '⚠ Selecciona un asunto.'); return false; }
    mostrarEstadoCampo(campo, feedback, true, ''); return true;
  }

  function validarMensaje() {
    const campo    = document.getElementById('mensajeInput');
    const feedback = document.getElementById('mensajeFeedback');
    const valor    = campo.value.trim();
    if (!valor)             { mostrarEstadoCampo(campo, feedback, false, '⚠ El mensaje es obligatorio.');                  return false; }
    if (valor.length < 10)  { mostrarEstadoCampo(campo, feedback, false, '⚠ El mensaje debe tener al menos 10 caracteres.'); return false; }
    mostrarEstadoCampo(campo, feedback, true, ''); return true;
  }

  function validarPrivacidad() {
    const campo    = document.getElementById('privacyCheck');
    const feedback = document.getElementById('privacyFeedback');
    if (!campo.checked) {
      feedback.className   = 'field-feedback error';
      feedback.textContent = '⚠ Debes aceptar la política de privacidad.';
      return false;
    }
    feedback.className   = 'field-feedback success';
    feedback.textContent = '✓ Aceptado';
    return true;
  }

  /* ---- Eventos de validación en tiempo real  ---- */
  document.getElementById('nombreInput').addEventListener('input', validarNombre);
  document.getElementById('nombreInput').addEventListener('blur',  validarNombre);

  document.getElementById('rutInput').addEventListener('input', validarRut);
  document.getElementById('rutInput').addEventListener('blur',  validarRut);

  document.getElementById('emailInput').addEventListener('input', validarEmail);
  document.getElementById('emailInput').addEventListener('blur',  validarEmail);

  document.getElementById('telefonoInput').addEventListener('input', validarTelefono);
  document.getElementById('telefonoInput').addEventListener('blur',  validarTelefono);

  document.getElementById('asuntoSelect').addEventListener('change', validarAsunto);

  document.getElementById('mensajeInput').addEventListener('input', function () {
    validarMensaje();
    // actualizar contador de caracteres
    document.getElementById('mensajeCounter').textContent =
      `${this.value.length} / 500 caracteres`;
  });

  document.getElementById('privacyCheck').addEventListener('change', validarPrivacidad);

  /* ---- Submit (submit event) ---- */
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const todosValidos = [
      validarNombre(),
      validarRut(),
      validarEmail(),
      validarTelefono(),
      validarAsunto(),
      validarMensaje(),
      validarPrivacidad()
    ].every(Boolean);

    if (!todosValidos) {
      mostrarToast('Por favor corrige los errores antes de enviar.', 'error');
      return;
    }

    // Feedback de carga
    submitBtn.disabled   = true;
    submitBtn.innerHTML  = '<span class="spinner-border spinner-border-sm me-2" aria-hidden="true"></span>Enviando...';

    // Simular petición asíncrona
    setTimeout(() => {
      form.style.display        = 'none'; // ocultar formulario
      formSuccess.style.display = 'block'; // mostrar mensaje de éxito
      mostrarToast('¡Mensaje enviado con éxito! 🎉', 'success');
    }, 1800);
  });

  /* ---- Reset (click, limpiar DOM) ---- */
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      form.reset();
      submitBtn.disabled  = false;
      submitBtn.innerHTML = '<i class="bi bi-send-fill me-2" aria-hidden="true"></i>Enviar mensaje';

      // limpiar clases y mensajes de validación
      form.querySelectorAll('.form-control, .form-select').forEach((el) => {
        el.classList.remove('is-valid', 'is-invalid');
      });
      form.querySelectorAll('.field-feedback').forEach((el) => {
        el.className   = 'field-feedback';
        el.textContent = '';
      });
      document.getElementById('mensajeCounter').textContent = '0 / 500 caracteres';

      formSuccess.style.display = 'none';  // ocultar éxito
      form.style.display        = 'block'; // mostrar formulario
    });
  }
})();

/* ============================================================
   SECCIÓN 12 – MÓDULO: NAV ACTIVO POR SECCIÓN
   IntersectionObserver
   toggle de clase 'active' en nav-links
   ============================================================ */
(function iniciarNavActivo() {
  const secciones   = document.querySelectorAll('section[id]');
  const enlacesNav  = document.querySelectorAll('.nav-link[href^="#"]');
  if (!secciones.length) return;

  const observer = new IntersectionObserver((entradas) => {
    entradas.forEach((entrada) => {
      if (entrada.isIntersecting) {
        const idActivo = entrada.target.id;
        enlacesNav.forEach((a) => {
          const coincide = a.getAttribute('href') === `#${idActivo}`;
          a.classList.toggle('active', coincide);         //toggle clase
          a.setAttribute('aria-current', coincide ? 'page' : 'false');
        });
      }
    });
  }, { threshold: 0.5 });

  secciones.forEach((sec) => observer.observe(sec));
})();

/* ============================================================
   SECCIÓN 13 – MÓDULO: HERO SLIDER (vanilla JS)
   click en flechas, click en puntos, setInterval (autoplay)
   agrega/quita clase 'active' en slides y puntos
   ============================================================ */
(function iniciarSlider() {
  const slides   = document.querySelectorAll('.hero-slide');
  const dots     = document.querySelectorAll('.slider-dot');
  const btnPrev  = document.getElementById('sliderPrev');
  const btnNext  = document.getElementById('sliderNext');

  if (!slides.length || !btnPrev || !btnNext) return;

  let indiceActual = 0;
  let intervalo;

  /**
   * Muestra el slide en la posición indicada.
   * quita 'active' del slide anterior y lo pone en el nuevo.
   * @param {number} nuevoIndice
   */
  function irA(nuevoIndice) {
    // Quitar activo actual
    slides[indiceActual].classList.remove('active');  //quitar clase
    dots[indiceActual].classList.remove('active');
    dots[indiceActual].setAttribute('aria-current', 'false');

    // Calcular índice con wrap-around
    indiceActual = (nuevoIndice + slides.length) % slides.length;

    // Activar el nuevo slide
    slides[indiceActual].classList.add('active');     //agregar clase
    dots[indiceActual].classList.add('active');
    dots[indiceActual].setAttribute('aria-current', 'true');
  }

  /** Avanza al siguiente slide */
  function siguiente() { irA(indiceActual + 1); }

  /** Retrocede al slide anterior */
  function anterior()  { irA(indiceActual - 1); }

  /** Inicia el autoplay */
  function iniciarAutoplay() {
    intervalo = setInterval(siguiente, 5000);
  }

  /** Reinicia el autoplay (al hacer clic manual) */
  function reiniciarAutoplay() {
    clearInterval(intervalo);
    iniciarAutoplay();
  }

  /* click en flecha siguiente */
  btnNext.addEventListener('click', () => {
    siguiente();
    reiniciarAutoplay();
  });

  /* click en flecha anterior */
  btnPrev.addEventListener('click', () => {
    anterior();
    reiniciarAutoplay();
  });

  /* click en cada punto indicador */
  dots.forEach((dot) => {
    dot.addEventListener('click', () => {
      irA(parseInt(dot.getAttribute('data-index'), 10));
      reiniciarAutoplay();
    });
  });

  /* Iniciar autoplay al cargar */
  iniciarAutoplay();
})();

/* ============================================================
   SECCIÓN 14 – INICIALIZACIÓN (DOMContentLoaded)
   Evento de ciclo de vida del documento
   punto de entrada único, organizado y coherente
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  iniciarRevealObserver();

  // Toast de bienvenida (crea elemento dinámicamente)
  setTimeout(() => {
    mostrarToast('¡Bienvenido/a a la Municipalidad de Cholchol! 🏛️', 'info');
  }, 1000);
});