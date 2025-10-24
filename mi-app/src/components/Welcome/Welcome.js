import React from "react";
import style from "./Welcome.module.css";

export default function Welcome({ userName, onProfileClick }) {
  return (
    <section id="bienvenida">
      <div className={style.welcomeBanner}>
        <div className={style.bannerLeft}>
          <div className={style.welcomeIcon}>🏅</div>
          <div className={style.welcomeText}>
            <h2>{`¡Bienvenido, ${userName}!`}</h2>
            <p>Monitora activa en 1 convocatoria. ¡Revisa nuevas oportunidades!</p>
          </div>
        </div>
        <button className={style.viewProfileBtn} onClick={onProfileClick}>Ver perfil</button>
      </div>
    </section>
  );
}
