import React from "react";
import style from "./MoreInfo.module.css";
import logo_subir from "../../images/logo_subir.png";
import { Link, useLocation } from 'react-router-dom';
import logo_udem from "../../images/logo_udem.png";
import avatar from "../../images/avatar.png";

export default function MoreInfo() {
  // Obtener información enviada desde la Card (si existe)
  const location = useLocation();
  const state = location.state || {};

  const formatDate = (d) => {
    if (!d) return '';
    const s = String(d);
    // Convertir YYYY-MM-DD a DD/MM/YYYY
    const m = s.match(/^(\d{4})-(\d{2})-(\d{2})$/);
    if (m) return `${m[3]}/${m[2]}/${m[1]}`;
    return s;
  };

  const info = {
    title: state.titulo || 'Monitoría de Programación I',
    curso: state.materia || 'Ingeniería de Sistemas',
    fechaLimite: formatDate(state.fechaFin) || '15/05/2024',
    puestos: state.numeroPuestos,
    imagen: state.imagen,
    descripcion: state.descripcion,
    requisitos: Array.isArray(state.requisitos) ? state.requisitos : undefined,
    habilidades: Array.isArray(state.habilidades) ? state.habilidades : undefined,
    beneficios: Array.isArray(state.beneficios) ? state.beneficios : undefined,
  };
  return (
    <div>
      {/* Header: logo left, avatar right */}
      <div className={style.pageHeader}>
        <div className={style.logoUdemContainer}>
          <img src={logo_udem} alt="Logo Universidad de Medellín" className={style.logoUdem} />
        </div>

        <div className={style.avatarContainer}>
          <img src={avatar} alt="Foto de perfil" className={style.avatar} />
        </div>
      </div>

      <div className={style.content}>
        {/* Volver */}
        <section className={style.button_back}>
          <div className={style.backBtnContainer}>
            <Link to="/student" className={style.backBtn}>Volver a Convocatorias</Link>
          </div>
        </section>

        {/* Titulo */}
        <section className={style.title}>
          <h1>{info.title}</h1>
        </section>


        {/* Banner */}
        <section className={style.courseBanner} aria-label="Información del curso">
          <div className={style.courseBanner__item}>
            {/* Icono: Laptop */}
            <svg
              className={style.courseBanner__icon}
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                fill="currentColor"
                d="M4 6c0-1.1.9-2 2-2h12c1.1 0 2 .9 2 2v9H4V6zm18 11H2v1c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2v-1z"
              />
            </svg>
            <span className={style.courseBanner__label}>Curso:</span>
            <span className={style.courseBanner__value}>{info.curso}</span>
          </div>

          <div className={`${style.courseBanner__item} ${style.courseBanner__itemCenter}`}>
            {/* Icono: Calendario */}
            <svg
              className={style.courseBanner__icon}
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                fill="currentColor"
                d="M19 4h-1V2h-2v2H8V2H6v2H5a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 15H5V10h14v9zm0-11H5V6h14v2z"
              />
            </svg>
            <span className={style.courseBanner__label}>Semestre:</span>
            <span className={style.courseBanner__value}>2024-I</span>
          </div>

          <div className={`${style.courseBanner__item} ${style.courseBanner__itemLeft}`}>
            {/* Icono: Reloj */}
            <svg
              className={style.courseBanner__icon}
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                fill="currentColor"
                d="M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2zm1 10.59V7h-2v6a1 1 0 0 0 .29.71l3.7 3.7 1.42-1.42z"
              />
            </svg>
            <span className={style.courseBanner__label}>Fecha límite:</span>
            <span className={style.courseBanner__value}>{info.fechaLimite}</span>
          </div>
        </section>


        
        {/* Descripcion */}
        <section className={style.description}>
          <p>
            {info.descripcion || (
              'La monitoría de Programación I ofrece una oportunidad única para estudiantes sobresalientes de Ingeniería de Sistemas de apoyar a sus compañeros en el aprendizaje de los fundamentos de la programación. Como monitor, mejorarás tus habilidades pedagógicas y de liderazgo mientras refuerzas tus conocimientos técnicos. Es una experiencia enriquecedora que contribuye al desarrollo académico de la comunidad universitaria.'
            )}
          </p>
        </section>

        {/* Requisitos + Habilidades en dos columnas */}
        <section className={style.infoColumns}>
          {/* Requisitos */}
          <section className={style.requirements}>
            <h2 className={style.requirementsTitle}>Requisitos</h2>
            <ul className={style.requirementsList}>
              {(info.requisitos && info.requisitos.length ? info.requisitos : [
                'Haber aprobado Programación I con una nota mínima de 4.0',
                'Conocimiento sólido en estructuras de datos básicas y algoritmos',
                'Capacidad para explicar conceptos complejos de manera clara',
                'Disponibilidad de 10 horas semanales para las actividades de monitoría',
                'Excelente actitud de servicio y proactividad'
              ]).map((req, i) => (
                <li key={`req-${i}`}>{req}</li>
              ))}
            </ul>
          </section>

          {/* Habilidades */}
          <section className={style.skills}>
            <h2 className={style.skillsTitle}>Habilidades</h2>
            <ul className={style.skillsList}>
              {(info.habilidades && info.habilidades.length ? info.habilidades : [
                'Python',
                'Java',
                'Pensamiento lógico',
                'Resolución de problemas',
                'Comunicación efectiva',
                'Trabajo en equipo'
              ]).map((sk, i) => (
                <li key={`sk-${i}`}>{sk}</li>
              ))}
            </ul>
          </section>
        </section>

        {/* Beneficios */}
        <section className={style.benefits}>
          <h2 className={style.benefitsTitle}>Beneficios</h2>
          <ul className={style.benefitsList}>
            {(info.beneficios && info.beneficios.length ? info.beneficios : [
              'Estímulo económico',
              'Certificado de experiencia laboral',
              'Desarrollo de habilidades de liderazgo y enseñanza',
              'Networking con profesores y estudiantes avanzados'
            ]).map((bf, i) => (
              <li key={`bf-${i}`}>{bf}</li>
            ))}
          </ul>
        </section>

        {/* Application form */}
        <section className={style.applicationForm}>
          <div className={style.formHeader}>
            <img src={logo_subir} alt="logo_subir" />

            {/* Bloque de texto (Título + descripción) */}
            <div className={style.formHeaderText}>
              <h2 className={style.formTitle}>Formulario de aplicación a monitoría académica</h2>
              <p className={style.formDescription}>
                Diligencia este formulario para postularte a las convocatorias de monitorías.<br />
                La información será revisada por el docente o coordinador responsable.<br />
                La IA puede sugerir opciones, pero la decisión final será académica.
              </p>
            </div>

            {/* Botones a la derecha */}
            <div className={style.formButtonsColumn}>
              <Link to="/form" className={style.submitBtn}>Enviar aplicación</Link>
              <div className={style.aiSupportBox}>Con apoyo de IA</div>
            </div>
          </div>
        </section>
      </div>

      {/* Footer (copiado de Student, adaptado a MoreInfo) */}
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