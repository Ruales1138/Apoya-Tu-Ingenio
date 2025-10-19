import React from "react";
import style from "./Student.module.css";
import logo_app from "../../images/logo_app.png";
import perfil from "../../images/perfil.png";
import logo_udem from "../../images/logo_udem.png";

function Student() {
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
          <li className={style.active}>📢 Convocatorias</li>
          <li>📄 Mis Aplicaciones</li>
          <li>📊 Indicadores</li>
        </ul>

        {/* Logo Universidad de Medellín */}
        <div className={style.logoUdemContainer}>
          <img src={logo_udem} alt="Logo Universidad de Medellín" className={style.logoUdem} />
        </div>
      </aside>

      {/* Contenido principal */}
      <main className={style.content}>
        <h1>Bienvenido</h1>
        <p>Aquí va el contenido principal de la página.</p>
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
