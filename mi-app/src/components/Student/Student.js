import React, { useEffect, useState, useRef } from "react";
import style from "./Student.module.css";
import logo_app from "../../images/logo_app.png";
import perfil from "../../images/perfil.png";
import logo_udem from "../../images/logo_udem.png";
import Carousel from "../Caousel/Carousel";
import Aplications from "../Aplications/Aplications";
import Alerts from "../Alerts/Alerts";
import Welcome from "../Welcome/Welcome";

function Student() {
  // marcador temporal para el nombre del usuario conectado; reemplazar por la autenticación real
  const [userName, setUserName] = useState('Susana Morales');
  // poblar userName desde localStorage si está disponible (el login guarda `user`)
  useEffect(() => {
    try {
      const raw = localStorage.getItem('user');
      if (!raw) return;
      const parsed = JSON.parse(raw);
  // preferir campos de nombre completo si están presentes, de lo contrario usar username
      const name = parsed.name || parsed.nombre || parsed.username || parsed.userName;
      if (name) setUserName(name);
    } catch (e) {
      // ignore parse errors
    }
  }, []);
  const [activeSection, setActiveSection] = useState('convocatorias');
  const activeSectionRef = useRef(activeSection);
  const tickingRef = useRef(false);
  const isAutoScrollingRef = useRef(false);
  // se eliminaron refs de espera/debounce no usados (usamos límites determinísticos)
  const anchorsRef = useRef([]);
  const boundariesRef = useRef([]);
  const headerHeightRef = useRef(64);
  const ignoreUntilRef = useRef(0);

  

  // calcular anclas/límites usados por el manejador de scroll. Extraído para
  // poder llamarlo después de un scroll programático y mantener las posiciones sincronizadas.
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
  // usar offsetTop (relativo al documento) que es estable durante el smooth scroll
  const anchors = visibleSections.map((s) => ({ id: s.id, top: s.offsetTop }));
    anchorsRef.current = anchors;

    const boundaries = [];
    for (let i = 0; i < anchors.length - 1; i++) {
      boundaries.push((anchors[i].top + anchors[i + 1].top) / 2);
    }
    boundariesRef.current = boundaries;
  };

  useEffect(() => {
  // Calcular anclas (tops absolutos) y límites (puntos medios) para las secciones
    computeAnchors();
    window.addEventListener('resize', computeAnchors);
  // recalcular después de que carguen fuentes/imagenes (pequeña demora)
    window.setTimeout(computeAnchors, 500);

    return () => window.removeEventListener('resize', computeAnchors);
  }, []);

  const handleProfileClick = () => {
    // manejador placeholder - la app puede reemplazarlo por navegación real
    // placeholder: reemplazar por navegación real si se desea
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (!element) return;

  // usar scrollIntoView para que el navegador respete scroll-margin-top (que ajustamos mediante una variable CSS)
  // marcar como scroll programático para que el listener/observador de scroll no lo sobrescriba
  isAutoScrollingRef.current = true;
  // calcular la posición final de scroll para que la sección quede justo debajo del header
  const header = document.querySelector('header');
  const headerHeight = header ? header.offsetHeight : headerHeightRef.current || 64;
  const targetTop = element.offsetTop - headerHeight - 12; // align with scroll-margin-top
  // establecer una ventana de ignorar para evitar que el onScroll procese múltiples eventos mientras el navegador anima
  ignoreUntilRef.current = Date.now() + 1200;
  window.scrollTo({ top: targetTop, behavior: 'smooth' });
  // actualizar la sección activa inmediatamente para retroalimentación en la UI
    setActiveSection(sectionId);
    activeSectionRef.current = sectionId;

    // monitorizar la posición de scroll y reactivar la detección manual cuando
    // el navegador haya completado el smooth scroll (o después de un tiempo máximo)
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

  // Sincronizar la sección activa mientras el usuario hace scroll manual: elegir la sección cuyo
  // top esté más cerca de la línea bajo el header. Usar requestAnimationFrame por rendimiento.
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
        <Welcome userName={userName} onProfileClick={handleProfileClick} />
        {/* Convocatorias */}
        <Carousel />
        {/* Mis aplicaciones */}
        <Aplications />
        {/* Alertas */}
        <Alerts />
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
