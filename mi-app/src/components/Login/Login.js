import React from "react";
import style from "./Login.module.css";
import logo from "../../images/logo_udem.png";

function Login() {
  return (
    <div className={style.container}>
      <div className={style.card}>
        <img src={logo} alt="Universidad de Medellín" className={style.logo} />

        <h2 className={style.title}>ApoyaTuIngenio</h2>
        <h3 className={style.subtitle}>Iniciar Sesión</h3>

        <div className={style.formGroup}>
          <label>Usuario</label>
          <input type="text" placeholder="Ingrese su nombre de usuario" />
        </div>

        <div className={style.formGroup}>
          <label>Contraseña</label>
          <input type="password" placeholder="Ingrese su contraseña" />
        </div>

        <div className={style.formGroup}>
          <label>Rol</label>
          <select>
            <option>Estudiante</option>
            <option>Docente</option>
            <option>Administrador</option>
          </select>
        </div>

        <button className={style.button}>Ingresar</button>

        <div className={style.footer}>
          <a href="#">¿Olvidó su contraseña?</a>
          <a href="#">Crear cuenta</a>
        </div>
      </div>
    </div>
  );
}

export default Login;
