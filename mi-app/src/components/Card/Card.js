import React from "react";
import { useNavigate } from 'react-router-dom';
import style from "./Card.module.css";

function Card({ imagen, titulo, curso, semestre, fecha }) {
  const navigate = useNavigate();

  return (
    <div className={style.card}>
      <img src={imagen} alt={titulo} className={style.cardImage} />
      <h3 className={style.cardTitle}>{titulo}</h3>

      <p className={style.cardInfo}>📘 Curso: {curso}</p>
      <p className={style.cardInfo}>📅 Semestre: {semestre}</p>
      <p className={style.cardInfo}>⏰ Fecha Límite: {fecha}</p>

      <button className={style.cardButton} onClick={() => navigate('/info')}>Aplicar</button>
    </div>
  );
}

export default Card;
