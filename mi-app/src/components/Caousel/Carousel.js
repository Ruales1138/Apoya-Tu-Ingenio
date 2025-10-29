import React, { useEffect, useState, useRef } from "react";
import style from "./Carousel.module.css";
import Card from "../Card/Card";

export default function Carousel() {
  const [convocatorias, setConvocatorias] = useState([]);
  const [cardIndex, setCardIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);
  const cardsContainerRef = useRef(null);
  const [trackX, setTrackX] = useState(0);
  const cardsTrackRef = useRef(null);

  useEffect(() => {
    fetch("http://localhost:3001/api/convocatorias")
      .then((res) => res.json())
      .then((data) => {
        setConvocatorias(data.convocatorias || []);
      })
      .catch((err) => console.error("Error cargando convocatorias:", err));
  }, []);

  useEffect(() => {
    const maxIndex = Math.max(0, convocatorias.length - visibleCount);
    if (cardIndex > maxIndex) setCardIndex(0);
  }, [convocatorias, cardIndex, visibleCount]);

  const prevCard = () => setCardIndex((i) => Math.max(0, i - visibleCount));
  const nextCard = () =>
    setCardIndex((i) => Math.min(Math.max(0, convocatorias.length - visibleCount), i + visibleCount));

  useEffect(() => {
    const update = () => {
      const track = cardsTrackRef.current;
      if (!track) return setTrackX(0);
      const firstCardWrapper = track.querySelector("div");
      const computed = window.getComputedStyle(track);
      const gap = parseFloat(computed.gap || computed.columnGap || 0) || 0;
      const cardWidth = firstCardWrapper ? firstCardWrapper.offsetWidth : 0;
      const step = cardWidth + gap;

      const container = cardsContainerRef.current;
      const containerWidth = container ? container.clientWidth : 0;
      const containerComputed = container ? window.getComputedStyle(container) : null;
      const paddingLeft = containerComputed ? parseFloat(containerComputed.paddingLeft || 0) : 0;
      const paddingRight = containerComputed ? parseFloat(containerComputed.paddingRight || 0) : 0;
      const visibleWidth = Math.max(0, containerWidth - paddingLeft - paddingRight);

      const calcVisible = cardWidth > 0 ? Math.max(1, Math.floor((visibleWidth + gap) / step)) : 1;
      if (calcVisible !== visibleCount) {
        setVisibleCount(calcVisible);
      }

      const desired = cardIndex * step;
      const maxX = Math.max(0, track.scrollWidth - visibleWidth);
      const finalX = Math.min(desired, maxX);

      try {
        // eslint-disable-next-line no-console
        console.log("[carousel-debug]", {
          containerWidth,
          paddingLeft,
          paddingRight,
          visibleWidth,
          trackScrollWidth: track.scrollWidth,
          cardWidth,
          gap,
          step,
          cardIndex,
          desired,
          maxX,
          finalX,
        });
      } catch (e) {}

      const maxIndex = Math.max(0, convocatorias.length - (calcVisible || visibleCount));
      if (cardIndex > maxIndex) setCardIndex(0);
      setTrackX(finalX);
    };

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [cardIndex, convocatorias, visibleCount]);

  return (
    <section id="convocatorias">
      <h2>Convocatorias Activas</h2>
      <div className={style.cardsWrapper}>
        {convocatorias.length > visibleCount && (
          <button
            className={style.navButton}
            onClick={prevCard}
            disabled={cardIndex === 0}
            aria-label="Anterior"
          >
            ‹
          </button>
        )}

        <div className={style.cardsContainer} ref={cardsContainerRef}>
          <div
            className={style.cardsTrack}
            ref={cardsTrackRef}
            style={{ transform: `translateX(-${trackX}px)` }}
          >
            {convocatorias.length > 0 ? (
              convocatorias.map((conv) => (
                <div key={conv.id} className={style.cardWrapper}>
                  <Card
                    id={conv.id}
                    titulo={conv.titulo}
                    materia={conv.materia}
                    numeroPuestos={conv.numeroPuestos}
                    fechaFin={conv.fechaFin}
                    imagen={conv.imagen}
                    descripcion={conv.descripcion}
                    requisitos={conv.requisitos}
                    habilidades={conv.habilidadesRequeridas}
                    beneficios={conv.beneficios}
                  />
                </div>
              ))
            ) : (
              <p>No hay convocatorias activas en este momento.</p>
            )}
          </div>
        </div>

        {convocatorias.length > visibleCount && (
          <button
            className={style.navButton}
            onClick={nextCard}
            disabled={cardIndex >= Math.max(0, convocatorias.length - visibleCount)}
            aria-label="Siguiente"
          >
            ›
          </button>
        )}
      </div>
    </section>
  );
}
