// Teacher.js
import React, { useEffect, useState, useRef } from "react";
import style from "./Teacher.module.css";
import logo_app from "../../images/logo_app.png";
import perfil from "../../images/perfil.png";
import logo_udem from "../../images/logo_udem.png";

/* ---------------- PublicarConvocatoria ---------------- */
function PublicarConvocatoria() {
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [materia, setMateria] = useState('');
  const [habilidades, setHabilidades] = useState('');
  const [fechaLimite, setFechaLimite] = useState('');
  const [puestos, setPuestos] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ titulo, descripcion, materia, habilidades, fechaLimite, puestos });
    alert("Convocatoria publicada!");
    setTitulo(''); setDescripcion(''); setMateria(''); setHabilidades(''); setFechaLimite(''); setPuestos(1);
  };

  return (
    <form className={style.formularioConvocatoria} onSubmit={handleSubmit}>
      <label>
        Título
        <input type="text" value={titulo} onChange={(e) => setTitulo(e.target.value)} placeholder="Título de la convocatoria" required />
      </label>

      <label>
        Descripción
        <textarea value={descripcion} onChange={(e) => setDescripcion(e.target.value)} placeholder="Describa responsabilidades y requisitos..." required />
      </label>

      <div className={style.formRow}>
        <label>
          Materia
          <input type="text" value={materia} onChange={(e) => setMateria(e.target.value)} placeholder="Materia" required />
        </label>

        <label>
          Habilidades Requeridas
          <input type="text" value={habilidades} onChange={(e) => setHabilidades(e.target.value)} placeholder="Habilidades necesarias" required />
        </label>
      </div>

      <div className={style.formRow}>
        <label>
          Fecha Límite
          <input type="date" value={fechaLimite} onChange={(e) => setFechaLimite(e.target.value)} required />
        </label>

        <label>
          Número de Puestos
          <input type="number" min="1" value={puestos} onChange={(e) => setPuestos(e.target.value)} required />
        </label>
      </div>

      <button type="submit" className={style.publicarBtn}>Publicar Convocatoria</button>
    </form>
  );
}

/* ---------------- RegistrarInforme ---------------- */
function RegistrarInforme() {
  const [monitor, setMonitor] = useState('');
  const [tipoInforme, setTipoInforme] = useState('');
  const [detalles, setDetalles] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ monitor, tipoInforme, detalles });
    alert("Informe registrado!");
    setMonitor(''); setTipoInforme(''); setDetalles('');
  };

  return (
    <form className={style.formularioInforme} onSubmit={handleSubmit}>
      <h2>Informe de Monitoría</h2>

      <div className={style.formRow}>
        <label>
          Monitor asignado
          <select value={monitor} onChange={(e) => setMonitor(e.target.value)} required>
            <option value="">Seleccionar monitor</option>
          </select>
        </label>

        <label>
          Tipo de informe
          <select value={tipoInforme} onChange={(e) => setTipoInforme(e.target.value)} required>
            <option value="">Seleccionar tipo</option>
          </select>
        </label>
      </div>

      <label>
        Detalles
        <textarea value={detalles} onChange={(e) => setDetalles(e.target.value)} placeholder="Escribe aquí el informe..." required />
      </label>

      <button type="submit" className={style.registrarBtn}>Registrar Informe</button>
    </form>
  );
}

/* ---------------- AlertasImportantes ---------------- */
function AlertasImportantes() {
  const [alertas, setAlertas] = useState([
    { mensaje: "Recuerda revisar las hojas de vida antes del viernes.", fecha: "26/10/2025" },
    { mensaje: "Un estudiante ha postulado para Matemáticas.", fecha: "25/10/2025" },
    { mensaje: "Hay convocatorias sin evaluar.", fecha: "24/10/2025" },
  ]);

  return (
    <section className={style.alertasImportantes}>
      <h2>Alertas Importantes</h2>
      <ul className={style.alertasList}>
        {alertas.length === 0 ? (
          <li className={style.alertaItem}>No hay alertas importantes.</li>
        ) : (
          alertas.map((alerta, index) => (
            <li key={index} className={style.alertaItem}>
              <div className={style.alertaHeader}>
                <span className={style.alertaIcon}>🔔</span>
                <span className={style.alertaTitulo}>¡Alerta!</span>
                <span className={style.alertaFecha}>{alerta.fecha}</span>
              </div>
              <p className={style.alertaMensaje}>{alerta.mensaje}</p>
            </li>
          ))
        )}
      </ul>
    </section>
  );
}

/* ---------------- Gestión de Candidatos ----------------
   Insertaré esta UI justo debajo del <h2> dentro de <section id="gestion">
*/
function GestionCandidatos() {
  const [search, setSearch] = useState("");
  const [showFilterIAMenu, setShowFilterIAMenu] = useState(false);
  const [candidates, setCandidates] = useState([
    {
      id: 1,
      nombre: "Andrés Gómez",
      avatar: perfil,
      materia: "Matemáticas",
      estado: "En revisión",
      score: 0.88,
      visto: false,
      preseleccionado: false,
    },
    {
      id: 2,
      nombre: "María López",
      avatar: perfil,
      materia: "Física",
      estado: "Preseleccionado",
      score: 0.94,
      visto: true,
      preseleccionado: true,
    },
    {
      id: 3,
      nombre: "Carlos Ramírez",
      avatar: perfil,
      materia: "Programación",
      estado: "Entrevistado",
      score: 0.76,
      visto: false,
      preseleccionado: false,
    },
  ]);

  // Filtrado en tiempo real por nombre
  const filtered = candidates.filter((c) =>
    c.nombre.toLowerCase().includes(search.trim().toLowerCase())
  );

  // Handlers
  const toggleVisto = (id) =>
    setCandidates((prev) => prev.map((c) => (c.id === id ? { ...c, visto: !c.visto } : c)));

  const marcarPreseleccionado = (id) =>
    setCandidates((prev) =>
      prev.map((c) =>
        c.id === id
          ? { ...c, preseleccionado: true, estado: "Preseleccionado" }
          : c
      )
    );

  const eliminarCandidato = (id) =>
    setCandidates((prev) => prev.filter((c) => c.id !== id)); // respuesta A: desaparece

  const aplicarFiltroIA = () => {
    // Placeholder - por ahora no hace nada real
    alert("Aplicando filtro IA (placeholder)");
  };

  return (
    <div className={style.gestionContainer}>
      {/* Barra de búsqueda y botones en una sola línea */}
      <div className={style.gestionBar}>
        <input
          className={style.searchInput}
          type="text"
          placeholder="Buscar candidato por nombre..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className={style.gestionButtons}>
          <div className={style.filterIaWrapper}>
            <button
              className={style.filterIaBtn}
              type="button"
              onClick={() => setShowFilterIAMenu((s) => !s)}
            >
              Filtro IA ▾
            </button>

            {showFilterIAMenu && (
              <div className={style.filterIaMenu}>
                {/* Placeholder: aquí irán las opciones reales */}
                <div className={style.filterOption}>Filtrar por score</div>
                <div className={style.filterOption}>Filtrar por estado</div>
              </div>
            )}
          </div>

          <button className={style.applyFilterBtn} type="button" onClick={aplicarFiltroIA}>
            Aplicar filtro
          </button>
        </div>
      </div>

      {/* Tabla */}
      <div className={style.tableWrapper}>
        <table className={style.candidatesTable}>
          <thead>
            <tr>
              <th>Candidato</th>
              <th>Materia</th>
              <th>Estado</th>
              <th>Puntuación IA</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan="5" className={style.emptyRow}>No hay candidatos que coincidan.</td>
              </tr>
            ) : (
              filtered.map((c) => (
                <tr key={c.id}>
                  <td className={style.candidateCell}>
                    <img src={c.avatar} alt={c.nombre} className={style.candidateAvatar} />
                    <span className={style.candidateName}>{c.nombre}</span>
                  </td>

                  <td>{c.materia}</td>

                  <td>
                    <span
                      className={`${style.estadoBadge} ${
                        c.estado === "Preseleccionado"
                          ? style.estadoPreseleccionado
                          : c.estado === "En revisión"
                          ? style.estadoRevision
                          : style.estadoEntrevistado
                      }`}
                    >
                      {c.estado}
                    </span>
                  </td>

                  <td>{Math.round(c.score * 100)}%</td>

                  <td className={style.actionsCell}>
                    <button
                      title={c.visto ? "Marcado como visto" : "Marcar como visto"}
                      className={style.actionBtn}
                      onClick={() => toggleVisto(c.id)}
                    >
                      👁
                    </button>

                    <button
                      title="Preseleccionar"
                      className={style.actionBtn}
                      onClick={() => marcarPreseleccionado(c.id)}
                    >
                      ✔
                    </button>

                    <button
                      title="Eliminar / Rechazar"
                      className={style.actionBtn}
                      onClick={() => {
                        if (window.confirm(`Eliminar a ${c.nombre}?`)) eliminarCandidato(c.id);
                      }}
                    >
                      🗑
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ---------------- Teacher (principal) ---------------- */
function Teacher() {
  const [userName, setUserName] = useState("Juan Pérez");
  const [activeSection, setActiveSection] = useState("materias");
  const activeSectionRef = useRef(activeSection);
  const tickingRef = useRef(false);
  const isAutoScrollingRef = useRef(false);
  const anchorsRef = useRef([]);
  const boundariesRef = useRef([]);
  const headerHeightRef = useRef(64);
  const ignoreUntilRef = useRef(0);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("user");
      if (!raw) return;
      const parsed = JSON.parse(raw);
      const name = parsed.name || parsed.nombre || parsed.username || parsed.userName;
      if (name) setUserName(name);
    } catch (e) {}
  }, []);

  const computeAnchors = () => {
    const header = document.querySelector("header");
    const headerHeight = header ? header.offsetHeight : 64;
    headerHeightRef.current = headerHeight;
    try { document.documentElement.style.setProperty("--header-height", `${headerHeight}px`); } catch (e) {}
    const sections = Array.from(document.querySelectorAll("section[id]"));
    const anchors = sections.map((s) => ({ id: s.id, top: s.offsetTop }));
    anchorsRef.current = anchors;
    const boundaries = [];
    for (let i = 0; i < anchors.length - 1; i++) boundaries.push((anchors[i].top + anchors[i + 1].top) / 2);
    boundariesRef.current = boundaries;
  };

  useEffect(() => {
    computeAnchors();
    window.addEventListener("resize", computeAnchors);
    window.setTimeout(computeAnchors, 500);
    return () => window.removeEventListener("resize", computeAnchors);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (!element) return;
    isAutoScrollingRef.current = true;
    const header = document.querySelector("header");
    const headerHeight = header ? header.offsetHeight : headerHeightRef.current || 64;
    const targetTop = element.offsetTop - headerHeight - 12;
    ignoreUntilRef.current = Date.now() + 1200;
    window.scrollTo({ top: targetTop, behavior: "smooth" });
    setActiveSection(sectionId);
    activeSectionRef.current = sectionId;
  };

  useEffect(() => {
    const onScroll = () => {
      if (tickingRef.current) return;
      tickingRef.current = true;
      requestAnimationFrame(() => {
        const headerHeight = headerHeightRef.current || 64;
        const adjustedY = window.pageYOffset + headerHeight + 12;
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
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className={style.pageContainer}>
      <header className={style.container}>
        <img src={logo_app} alt="Logo de la aplicación" className={style.logo} />
        <div className={style.rightSection}>
          <button className={style.button}><span className={style.iconUser}>👤</span> {userName}</button>
          <button className={style.button}><span className={style.iconLogout}>⎋</span> Cerrar Sesión</button>
          <img src={perfil} alt="Foto de perfil" className={style.perfil} />
        </div>
      </header>

      <aside className={style.sidebar}>
        <ul className={style.menu}>
          <li onClick={() => scrollToSection("publicar")} className={activeSection === "publicar" ? style.active : ""}>📢 Publicar Convocatorias</li>
          <li onClick={() => scrollToSection("gestion")} className={activeSection === "gestion" ? style.active : ""}>📝 Gestión de Candidatos</li>
          <li onClick={() => scrollToSection("evaluacion")} className={activeSection === "evaluacion" ? style.active : ""}>✅ Evaluación y Asignación</li>
          <li onClick={() => scrollToSection("informes")} className={activeSection === "informes" ? style.active : ""}>📊 Informes de Monitorías</li>
        </ul>
        <div className={style.logoUdemContainer}>
          <img src={logo_udem} alt="Logo Universidad de Medellín" className={style.logoUdem} />
        </div>
      </aside>

      <main className={style.content}>
        <section id="publicar">
          <h2>Publicar Convocatorias</h2>
          <PublicarConvocatoria />
          <AlertasImportantes />
        </section>

        <section id="gestion">
          <h2>Gestión de Candidatos</h2>
          {/* Aquí va la UI de gestión de candidatos */}
          <GestionCandidatos />
        </section>

        <section id="evaluacion"><h2>Evaluación y Asignación</h2></section>

        <section id="informes">
          <h2>Informes de Monitorías</h2>
          <RegistrarInforme />
        </section>
      </main>

      <footer className={style.footer}>
        <div className={style.footerLinks}>
          <a href="#recursos">Recursos</a>
          <a href="#contacto">Contacto</a>
          <a href="#legal">Legal</a>
        </div>
        <div className={style.footerIcons}>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook-f"></i></a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter"></i></a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin-in"></i></a>
        </div>
      </footer>
    </div>
  );
}

export default Teacher;
