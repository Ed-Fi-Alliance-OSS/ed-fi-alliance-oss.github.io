import React, { useState } from 'react';
import styles from './styles.module.css';

export default function ImageCarousel({ images }) {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c - 1 + images.length) % images.length);
  const next = () => setCurrent((c) => (c + 1) % images.length);

  return (
    <div className={styles.carousel}>
      <div className={styles.imageWrapper}>
        <img
          src={images[current].src}
          alt={images[current].alt}
          className={styles.image}
        />
        {images[current].caption && (
          <p className={styles.caption}>{images[current].caption}</p>
        )}
      </div>
      <div className={styles.controls}>
        <button className={styles.btn} onClick={prev} aria-label="Previous image">
          &#8592;
        </button>
        <span className={styles.counter}>
          {current + 1} / {images.length}
        </span>
        <button className={styles.btn} onClick={next} aria-label="Next image">
          &#8594;
        </button>
      </div>
      <div className={styles.dots}>
        {images.map((_, i) => (
          <button
            key={i}
            className={`${styles.dot} ${i === current ? styles.dotActive : ''}`}
            onClick={() => setCurrent(i)}
            aria-label={`Go to image ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
