// Register.jsx
import React, { useState } from "react";
import style from "./Register.module.css";
import { useNavigate } from "react-router-dom";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [role, setRole] = useState("Estudiante");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (password !== confirm) {
      setError("Las contraseñas no coinciden");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("http://localhost:3001/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password, role }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Error en el registro");

      // Redirigir al login tras registro exitoso
      navigate("/");
    } catch (err) {
      console.error(err);
      setError(err.message || "Error al registrarse. Inténtalo de nuevo.");
      setLoading(false);
    }
  };

  return (
    <div className={style.container}>
      <div className={style.card}>
        <h3 className={style.subtitle}>Crear Cuenta</h3>

        <form onSubmit={handleSubmit} className={style.form}>
          <div className={style.formGroup}>
            <label>Usuario</label>
            <input
              className={style.input}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              placeholder="Ingrese su nombre de usuario"
              required
            />
          </div>

          <div className={style.formGroup}>
            <label>Email</label>
            <input
              className={style.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Ingrese su correo electrónico"
              required
            />
          </div>

          <div className={style.formGroup}>
            <label>Contraseña</label>
            <input
              className={style.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Ingrese su contraseña"
              required
            />
          </div>

          <div className={style.formGroup}>
            <label>Confirmar Contraseña</label>
            <input
              className={style.input}
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              type="password"
              placeholder="Repita su contraseña"
              required
            />
          </div>

          <div className={style.formGroup}>
            <label>Rol</label>
            <select
              className={style.select}
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option>Estudiante</option>
              <option>Docente</option>
            </select>
          </div>

          {error && <div className={style.error}>{error}</div>}

          <button type="submit" className={style.button} disabled={loading}>
            {loading ? "Registrando..." : "Registrarme"}
          </button>
        </form>

        <div className={style.footer}>
          <a onClick={() => navigate("/")}>¿Ya tienes cuenta? Inicia sesión</a>
        </div>
      </div>
    </div>
  );
}

export default Register;