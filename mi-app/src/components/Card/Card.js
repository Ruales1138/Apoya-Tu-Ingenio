import React from "react";
import style from "./Card.module.css";
import { useNavigate } from 'react-router-dom';
import portada_1 from "../../images/portada_1.png"; // 👈 Importamos la portada por defecto
import portada_2 from "../../images/portada_2.png";
import portada_3 from "../../images/portada_3.png";

// Muestra solo: imagen, título, materia, número de puestos y fecha límite
function Card({ titulo, materia, numeroPuestos, fechaFin, imagen }) {
  const navigate = useNavigate();

  // Selección automática de portada según la materia (case-insensitive)
  const mat = (materia || "").toLowerCase();
  let defaultPortada = portada_1;

  // Palabras clave para matemáticas/física
  const mathPhysicsRegex = /matem|físic|fisic|cálcu|calcu|estad|probab|álgebra|algebra|geometr|física/;
  // Palabras clave para electrónica/electricidad
  const electronicsRegex = /electr|eléctr|electric|electron|circuit|circuito|eléctrico|electrónica|electronica/;

  if (mathPhysicsRegex.test(mat)) {
    defaultPortada = portada_2;
  } else if (electronicsRegex.test(mat)) {
    defaultPortada = portada_3;
  }

  const displayImage = imagen || defaultPortada;

  // Formatea la fecha a YYYY-MM-DD cuando sea posible
  const formatFecha = (d) => {
    if (!d) return "";
    // Intentar parsear con Date
    const parsed = new Date(d);
    if (!isNaN(parsed.getTime && parsed.getTime())) {
      return parsed.toISOString().slice(0, 10);
    }
    // Si viene como string ISO con T, tomar la parte antes de 'T'
    if (typeof d === 'string' && d.includes('T')) return d.split('T')[0];
    // Fallback: tomar los primeros 10 caracteres de la representación
    return String(d).slice(0, 10);
  };

  const formattedFecha = formatFecha(fechaFin);

  return (
    <div className={style.card}>
      {/* Si no hay imagen, usamos portada_1 */}
        <img
          src={displayImage}
          alt={titulo}
          className={style.cardImage}
        />

      <h3 className={style.cardTitle}>{titulo}</h3>

      <p className={style.cardInfo}>📘 Materia: {materia}</p>
      <p className={style.cardInfo}>👥 Puestos: {numeroPuestos}</p>
      <p className={style.cardInfo}>⏰ Fecha Límite: {formattedFecha}</p>

      <button 
        className={style.cardButton} 
        onClick={() => navigate('/info')}
      >
        Aplicar
      </button>
    </div>
  );
}

export default Card;