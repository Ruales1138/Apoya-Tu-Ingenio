import React from "react";
import style from "./Student.module.css";
import logo_app from "../../images/logo_app.png";
import perfil from "../../images/perfil.png";

function Student() {
  return (
    <header className={style.container}>
      <img src={logo_app} alt="logo_app" className={style.logo} />

      <div className={style.rightSection}>
        <button className={style.button}>
          <span className={style.iconUser}>👤</span> Usuario
        </button>
        <button className={style.button}>
          <span className={style.iconLogout}>⎋</span> Cerrar Sesión
        </button>
        <img src={perfil} alt="perfil" className={style.perfil} />
      </div>
    </header>
  );
}

export default Student;
