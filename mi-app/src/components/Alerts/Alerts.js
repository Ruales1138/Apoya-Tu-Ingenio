import React from "react";
import style from "./Alerts.module.css";

export default function Alerts() {
  return (
    <section id="alertas">
      <h2>Alertas importantes</h2>
      <div className={style.alertsContainer}>
        <div className={style.alertBox}>
          <div className={style.alertIcon}>🔔</div>
          <div className={style.alertText}>
            <h3>¡Alerta!</h3>
            <p>Tienes 2 tareas pendientes para la monitoría de Programación I.</p>
          </div>
        </div>

        <div className={style.alertBox}>
          <div className={style.alertIcon}>🔔</div>
          <div className={style.alertText}>
            <h3>¡Alerta!</h3>
            <p>Se ha publicado una nueva convocatoria para Química Orgánica.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
