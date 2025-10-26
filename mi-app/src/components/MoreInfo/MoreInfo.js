import React from "react";
import style from "./MoreInfo.module.css";
import logo_subir from "../../images/logo_subir.png";
import { Link } from 'react-router-dom';
import logo_udem from "../../images/logo_udem.png";
import avatar from "../../images/avatar.png";

export default function MoreInfo() {
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
          <h1>Monitoría de Programación I</h1>
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
            <span className={style.courseBanner__value}>Ingeniería de Sistemas</span>
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
            <span className={style.courseBanner__value}>15/05/2024</span>
          </div>
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

      
    </ div>
  );
}