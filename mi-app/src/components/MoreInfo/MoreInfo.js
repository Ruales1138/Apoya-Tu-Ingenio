import React from "react";
import style from "./MoreInfo.module.css";
import logo_subir from "../../images/logo_subir.png";
import { Link } from 'react-router-dom';

function MoreInfo() {
  return (
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
  );
}

export default MoreInfo;