import React from "react";
import style from "./Student.module.css";
import logo from "../../images/logo_udem.png";
import perfil from "../../images/perfil.png"

function Student() {
  return (
    <div className={style.page}>
      {/* 🔹 NAVBAR */}
      <header className={style.navbar}>
        <div className={style.navLeft}>
          <img src={logo} alt="Logo UdeM" className={style.logo} />
        </div>
        <div className={style.navRight}>
          <button className={style.logout}>Cerrar sesión</button>
          <div className={style.avatar}>
            <img src={perfil} alt="avatar" />
          </div>
        </div>
      </header>

      {/* 🔹 SIDEBAR */}
      <aside className={style.sidebar}>
        <ul className={style.menu}>
          <li className={`${style.menuItem} ${style.active}`}>Dashboard</li>
          <li className={style.menuItem}>Cursos</li>
          <li className={style.menuItem}>Calificaciones</li>
        </ul>
      </aside>

      {/* 🔹 CONTENIDO PRINCIPAL */}
      <main className={style.main}>
        <section className={style.welcome}>
          <h1>Bienvenido, estudiante 👋</h1>
          <p>Aquí podrás ver tus cursos, progreso y notificaciones.</p>
        </section>

        {/* 🔹 TARJETA DE CURSO */}
        <section className={style.cardSection}>
          <div className={style.card}>
            <img
              src="https://via.placeholder.com/326x183"
              alt="Curso"
              className={style.cardImage}
            />
            <h2 className={style.cardTitle}>Introducción a la programación</h2>
            <div className={style.cardDetails}>
              <span>📘 Curso básico</span>
              <span>⏰ 40 horas</span>
            </div>
            <button className={style.cardButton}>Ver más</button>
          </div>

          <div className={style.card}>
            <img
              src="https://via.placeholder.com/326x183"
              alt="Curso"
              className={style.cardImage}
            />
            <h2 className={style.cardTitle}>Matemáticas aplicadas</h2>
            <div className={style.cardDetails}>
              <span>📘 Curso intermedio</span>
              <span>⏰ 60 horas</span>
            </div>
            <button className={style.cardButton}>Ver más</button>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Student;
