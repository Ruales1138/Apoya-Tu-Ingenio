import React from "react";
import style from "./Student.module.css";
import logo_app from "../../images/logo_app.png";
import perfil from "../../images/perfil.png";
import logo_udem from "../../images/logo_udem.png";

function Student() {
  return (
    <div className={style.pageContainer}>
      {/* Barra superior roja */}
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

      {/* Barra lateral */}
      <aside className={style.sidebar}>
        <ul className={style.menu}>
          <li className={style.active}>📢 Convocatorias</li>
          <li>📄 Mis Aplicaciones</li>
          <li>📊 Indicadores</li>
        </ul>

        {/* Logo Universidad de Medellín */}
        <div className={style.logoUdemContainer}>
          <img src={logo_udem} alt="logo_udem" className={style.logoUdem} />
        </div>
      </aside>

      {/* Contenido principal */}
      <main className={style.content}>
        <h1>Bienvenido</h1>
        <p>Aquí va el contenido principal de la página.</p>
      </main>
    </div>
  );
}

export default Student;
