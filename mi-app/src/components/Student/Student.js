import React, { useEffect, useState, useRef } from "react";
import style from "./Student.module.css";
import logo_app from "../../images/logo_app.png";
import perfil from "../../images/perfil.png";
import logo_udem from "../../images/logo_udem.png";
import Card from "../Card/Card";

function Student() {
  const [activeSection, setActiveSection] = useState('convocatorias');
  const activeSectionRef = useRef(activeSection);
  const tickingRef = useRef(false);
  const isAutoScrollingRef = useRef(false);
  // unused pending/debounce refs removed (we use deterministic boundaries)
  const anchorsRef = useRef([]);
  const boundariesRef = useRef([]);
  const headerHeightRef = useRef(64);
  const ignoreUntilRef = useRef(0);

  // Estado para convocatorias
  const [convocatorias, setConvocatorias] = useState([]);
  // Índice de la primera card visible en el carrusel
  const [cardIndex, setCardIndex] = useState(0);
  // número de cards visibles calculado dinámicamente según ancho disponible
  const [visibleCount, setVisibleCount] = useState(3);
  const cardsContainerRef = useRef(null);
  const [trackX, setTrackX] = useState(0);
  const cardsTrackRef = useRef(null);

  // Llamada al backend
  useEffect(() => {
    fetch("http://localhost:3001/api/convocatorias")
      .then((res) => res.json())
      .then((data) => {
        setConvocatorias(data.convocatorias || []);
      })
      .catch((err) => console.error("Error cargando convocatorias:", err));
  }, []);

  // Mantener el índice dentro de rango cuando cambian las convocatorias
  useEffect(() => {
    const maxIndex = Math.max(0, convocatorias.length - visibleCount);
    if (cardIndex > maxIndex) setCardIndex(0);
  }, [convocatorias, cardIndex]);

  // navegar por "páginas" de visibleCount para evitar mostrar cards parciales
  const prevCard = () => setCardIndex((i) => Math.max(0, i - visibleCount));
  const nextCard = () => setCardIndex((i) => Math.min(Math.max(0, convocatorias.length - visibleCount), i + visibleCount));

  // Update track position (px) when index, resize or cards change
  useEffect(() => {
    const update = () => {
      const track = cardsTrackRef.current;
      if (!track) return setTrackX(0);
      const firstCardWrapper = track.querySelector('div');
      const computed = window.getComputedStyle(track);
      const gap = parseFloat(computed.gap || computed.columnGap || 0) || 0;
      const cardWidth = firstCardWrapper ? firstCardWrapper.offsetWidth : 0;
      const step = cardWidth + gap;
  const container = cardsContainerRef.current;
  const containerWidth = container ? container.clientWidth : 0;
  // account for container paddings (we add left/right in CSS to avoid fades)
  const containerComputed = container ? window.getComputedStyle(container) : null;
  const paddingLeft = containerComputed ? parseFloat(containerComputed.paddingLeft || 0) : 0;
  const paddingRight = containerComputed ? parseFloat(containerComputed.paddingRight || 0) : 0;
  const visibleWidth = Math.max(0, containerWidth - paddingLeft - paddingRight);

  // compute how many full cards fit inside the visible area (avoid partial cut)
  const calcVisible = cardWidth > 0 ? Math.max(1, Math.floor((visibleWidth + gap) / step)) : 1;
      if (calcVisible !== visibleCount) {
        setVisibleCount(calcVisible);
      }

      const desired = cardIndex * step;
      // compute max allowed translate to avoid overscrolling and cutting last card
  // compute max allowed translate so no card is cut; use visibleWidth (exclude paddings)
  const maxX = Math.max(0, track.scrollWidth - visibleWidth);
      const finalX = Math.min(desired, maxX);

      // debug logging to help tune widths/gaps during development
      try {
        // eslint-disable-next-line no-console
        console.log('[carousel-debug]', {
          containerWidth,
          paddingLeft,
          paddingRight,
          visibleWidth,
          trackScrollWidth: track.scrollWidth,
          cardWidth,
          gap,
          step,
          cardIndex,
          desired,
          maxX,
          finalX,
        });
      } catch (e) {}

      // ensure cardIndex is within new bounds if visibleCount changed
      const maxIndex = Math.max(0, convocatorias.length - (calcVisible || visibleCount));
      if (cardIndex > maxIndex) setCardIndex(0);
      setTrackX(finalX);
    };

    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, [cardIndex, convocatorias]);

  // compute anchors/boundaries used by the scroll handler. Extracted so
  // it can be called after programmatic scrolling to keep positions in sync.
  const computeAnchors = () => {
    const header = document.querySelector('header');
    const headerHeight = header ? header.offsetHeight : 64;
    headerHeightRef.current = headerHeight;
    try {
      document.documentElement.style.setProperty('--header-height', `${headerHeight}px`);
    } catch (e) {}
  const sections = Array.from(document.querySelectorAll('section[id]'));
  // Excluir la sección de bienvenida para que el menú lateral trate
  // la zona superior (banner de bienvenida) como parte de "convocatorias".
  const visibleSections = sections.filter((s) => s.id !== 'bienvenida');
  // use offsetTop (document-relative) which is stable during smooth scroll
  const anchors = visibleSections.map((s) => ({ id: s.id, top: s.offsetTop }));
    anchorsRef.current = anchors;

    const boundaries = [];
    for (let i = 0; i < anchors.length - 1; i++) {
      boundaries.push((anchors[i].top + anchors[i + 1].top) / 2);
    }
    boundariesRef.current = boundaries;
  };

  useEffect(() => {
    // Compute anchors (absolute tops) and boundaries (midpoints) for sections
    computeAnchors();
    window.addEventListener('resize', computeAnchors);
    // recompute after fonts/images load (small delay)
    window.setTimeout(computeAnchors, 500);

    return () => window.removeEventListener('resize', computeAnchors);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (!element) return;

    // use scrollIntoView so browser respects scroll-margin-top (which we set via CSS var)
    // mark as programmatic scroll so the scroll listener/observer won't override
  isAutoScrollingRef.current = true;
  // compute final scroll top so the section sits just below the header
  const header = document.querySelector('header');
  const headerHeight = header ? header.offsetHeight : headerHeightRef.current || 64;
  const targetTop = element.offsetTop - headerHeight - 12; // align with scroll-margin-top
  // set an ignore window to avoid onScroll handling flurries while browser animates
  ignoreUntilRef.current = Date.now() + 1200;
  window.scrollTo({ top: targetTop, behavior: 'smooth' });
    // update active immediately for UI feedback
    setActiveSection(sectionId);
    activeSectionRef.current = sectionId;

    // monitor the scroll position and re-enable manual detection when
    // the browser has completed the smooth scroll (or after a max wait)
    const start = Date.now();
    const maxWait = 2000; // ms
  const tolerance = 12; // px
  const checkInterval = 40; // ms
    const checkId = window.setInterval(() => {
      const cur = window.pageYOffset;
        if (Math.abs(cur - targetTop) <= tolerance || Date.now() - start > maxWait) {
        clearInterval(checkId);
        try {
          computeAnchors();
        } catch (e) {}
        isAutoScrollingRef.current = false;
        // keep a short post-scroll lock to avoid immediate scroll-handler flips
        ignoreUntilRef.current = Date.now() + 350;
        // final commit of active section
        setActiveSection(sectionId);
        activeSectionRef.current = sectionId;
      }
    }, checkInterval);
  };

  // Sync active section while user scrolls manually: choose the section whose
  // top is closest to the header position. Use requestAnimationFrame for perf.
  useEffect(() => {
    const sections = Array.from(document.querySelectorAll('section[id]'));
    if (!sections.length) return;

    const onScroll = () => {
      if (tickingRef.current) return;
      tickingRef.current = true;
      requestAnimationFrame(() => {
        // skip updates while programmatic scrolling or within ignore window
        if (isAutoScrollingRef.current || Date.now() < (ignoreUntilRef.current || 0)) {
          tickingRef.current = false;
          return;
        }

        const headerHeight = headerHeightRef.current || 64;
        // adjustedY is the document Y that corresponds to the line under the header
        const adjustedY = window.pageYOffset + headerHeight + 12; // position under header

        const anchors = anchorsRef.current;
        const boundaries = boundariesRef.current;
        if (!anchors || !anchors.length) {
          tickingRef.current = false;
          return;
        }

  let index = boundaries.findIndex((b) => adjustedY < b);
        if (index === -1) index = anchors.length - 1;

        const id = anchors[index].id;
        if (id && activeSectionRef.current !== id) {
          setActiveSection(id);
          activeSectionRef.current = id;
        }

        tickingRef.current = false;
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    // run once to set initial active
    onScroll();

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className={style.pageContainer}>
      {/* Barra superior */}
      <header className={style.container}>
        <img src={logo_app} alt="Logo de la aplicación" className={style.logo} />

        <div className={style.rightSection}>
          <button className={style.button}>
            <span className={style.iconUser}>👤</span> Usuario
          </button>
          <button className={style.button}>
            <span className={style.iconLogout}>⎋</span> Cerrar Sesión
          </button>
          <img src={perfil} alt="Foto de perfil" className={style.perfil} />
        </div>
      </header>

      {/* Barra lateral */}
      <aside className={style.sidebar}>
        <ul className={style.menu}>
          <li 
            onClick={() => scrollToSection('convocatorias')}
            className={activeSection === 'convocatorias' ? style.active : ''}
          >
            📢 Convocatorias
          </li>
          <li 
            onClick={() => scrollToSection('aplicaciones')}
            className={activeSection === 'aplicaciones' ? style.active : ''}
          >
            📄 Mis Aplicaciones
          </li>
        </ul>

        {/* Logo Universidad de Medellín */}
        <div className={style.logoUdemContainer}>
          <img src={logo_udem} alt="Logo Universidad de Medellín" className={style.logoUdem} />
        </div>
      </aside>

      {/* Contenido principal */}
      <main className={style.content}>
        {/* Banner de bienvenida */}
        <section id="bienvenida">
          <div className={style.welcomeBanner}>
            <div className={style.bannerLeft}>
              <div className={style.welcomeIcon}>🏅</div>
              <div className={style.welcomeText}>
                <h2>¡Bienvenido, Susana Morales!</h2>
                <p>Monitora activa en 1 convocatoria. ¡Revisa nuevas oportunidades!</p>
              </div>
            </div>
            <button className={style.viewProfileBtn}>Ver perfil</button>
          </div>
        </section>

        {/* Convocatorias */}
        <section id="convocatorias">
          <h2>Convocatorias Activas</h2>
          <div className={style.cardsWrapper}>
            {convocatorias.length > visibleCount && (
              <button
                className={style.navButton}
                onClick={prevCard}
                disabled={cardIndex === 0}
                aria-label="Anterior"
              >
                ‹
              </button>
            )}

            <div className={style.cardsContainer} ref={cardsContainerRef}>
              <div className={style.cardsTrack} ref={cardsTrackRef} style={{ transform: `translateX(-${trackX}px)` }}>
                {convocatorias.length > 0 ? (
                  convocatorias
                    .slice(0, convocatorias.length) // render all but show via track
                    .map((conv) => (
                      <div key={conv.id} className={style.cardWrapper}>
                        <Card
                          titulo={conv.titulo}
                          materia={conv.materia}
                          numeroPuestos={conv.numeroPuestos}
                          fechaFin={conv.fechaFin}
                          imagen={conv.imagen}
                        />
                      </div>
                    ))
                ) : (
                  <p>No hay convocatorias activas en este momento.</p>
                )}
              </div>
            </div>

            {convocatorias.length > visibleCount && (
              <button
                className={style.navButton}
                onClick={nextCard}
                disabled={cardIndex >= Math.max(0, convocatorias.length - visibleCount)}
                aria-label="Siguiente"
              >
                ›
              </button>
            )}
          </div>
        </section>

        {/* Mis aplicaciones */}
        <section id="aplicaciones">
          <h2>Mis Aplicaciones</h2>
          <div className={style.applicationsTable}>
            <table className={style.table}>
              <thead>
                <tr>
                  <th>Convocatoria</th>
                  <th>Curso</th>
                  <th>Fecha de Aplicación</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Monitoría de Programación I</td>
                  <td>Ingeniería de Sistemas</td>
                  <td>01/05/2024</td>
                  <td className={style.estadoAceptada}>Aceptada</td>
                </tr>
                <tr>
                  <td>Monitoría de Base de Datos</td>
                  <td>Ciencias de la Computación</td>
                  <td>28/04/2024</td>
                  <td className={style.estadoPendiente}>Pendiente</td>
                </tr>
                <tr>
                  <td>Monitoría de Estadística</td>
                  <td>Matemáticas</td>
                  <td>25/04/2024</td>
                  <td className={style.estadoRechazada}>Rechazada</td>
                </tr>
                <tr>
                  <td>Monitoría de Física II</td>
                  <td>Ingeniería Civil</td>
                  <td>22/04/2024</td>
                  <td className={style.estadoPendiente}>Pendiente</td>
                </tr>
                <tr>
                  <td>Monitoría de Redes I</td>
                  <td>Ingeniería de Telecomunicaciones</td>
                  <td>18/04/2024</td>
                  <td className={style.estadoAceptada}>Aceptada</td>
                </tr>
              </tbody>
            </table>
        </div>
        </section>


  {/* Formulario movido a MoreInfo component. Se muestra en /info */}

        
        {/* Alertas */}
        <section id="alertas"> <h2>Alertas importantes</h2>
          <div className={style.alertsContainer}>
            {/* Primer alerta */}
            <div className={style.alertBox}>
              <div className={style.alertIcon}>🔔</div>
              <div className={style.alertText}>
                <h3>¡Alerta!</h3>
                <p>Tienes 2 tareas pendientes para la monitoría de Programación I.</p>
              </div>
            </div>

            {/* Segunda alerta */}
            <div className={style.alertBox}>
              <div className={style.alertIcon}>🔔</div>
              <div className={style.alertText}>
                <h3>¡Alerta!</h3>
                <p>Se ha publicado una nueva convocatoria para Química Orgánica.</p>
              </div>
            </div>
          </div>
        </section>
        
      </main>

      {/* Footer */}
      <footer className={style.footer}>
        <div className={style.footerLinks}>
          <a href="#recursos">Recursos</a>
          <a href="#contacto">Contacto</a>
          <a href="#legal">Legal</a>
        </div>

        <div className={style.footerIcons}>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-linkedin-in"></i>
          </a>
        </div>
      </footer>
    </div>
  );
}

export default Student;
