import React from "react";
import { useNavigate } from 'react-router-dom';
import style from "./Card.module.css";
import portada_1 from "../../images/portada_1.png"; // 👈 Importamos la portada por defecto

function Card({ titulo, descripcion, materia, estado, fechaFin, imagen }) {
  const navigate = useNavigate();

  return (
    <div className={style.card}>
      {/* Si no hay imagen, usamos portada_1 */}
      <img 
        src={imagen || portada_1} 
        alt={titulo} 
        className={style.cardImage} 
      />

      <h3 className={style.cardTitle}>{titulo}</h3>

      <p className={style.cardInfo}>📘 Materia: {materia}</p>
      <p className={style.cardInfo}>📝 Descripción: {descripcion}</p>
      <p className={style.cardInfo}>📌 Estado: {estado}</p>
      <p className={style.cardInfo}>⏰ Fecha Límite: {fechaFin}</p>

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