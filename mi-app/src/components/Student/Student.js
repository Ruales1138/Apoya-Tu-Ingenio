import React from "react";
import style from "./Student.module.css";
import logo_app from "../../images/logo_app.png";
import perfil from "../../images/perfil.png";
import logo_udem from "../../images/logo_udem.png";
import Card from "../Card/Card";
import portada_1 from "../../images/portada_1.png";
import portada_2 from "../../images/portada_2.png";
import portada_3 from "../../images/portada_3.png";
import logo_subir from "../../images/logo_subir.png";

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
          <li>📢 Convocatorias</li>
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
        {/* Banner de bienvenida */}
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

        {/* Convocatorias */}
        <h2>Convocatorias Activas</h2>
        <div className={style.cardsContainer}>
          <Card
            imagen={portada_1}
            titulo="Monitoría de Programación I"
            curso="Ingeniería de Sistemas"
            semestre="2024-1"
            fecha="15/05/2024"
          />
          <Card
            imagen={portada_2}
            titulo="Monitoría de Cálculo Diferencial"
            curso="Matemáticas Aplicadas"
            semestre="2024-1"
            fecha="20/05/2024"
          />
          <Card
            imagen={portada_3}
            titulo="Monitoría de Circuitos Eléctricos"
            curso="Ingeniería Electrónica"
            semestre="2024-1"
            fecha="22/05/2024"
          />
        </div>

        {/* Mis aplicaciones */}
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

      {/* Formulario de aplicación */}
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
            <button className={style.submitBtn}>Enviar aplicación</button>
            <div className={style.aiSupportBox}>Con apoyo de IA</div>
          </div>
        </div>
        
        {/* Aquí vendría el resto del formulario */}
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
