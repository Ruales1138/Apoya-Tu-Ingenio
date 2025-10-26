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