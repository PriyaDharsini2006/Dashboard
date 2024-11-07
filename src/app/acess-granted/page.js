
 'use client'

import React, { useEffect } from 'react';
import styles from './AccessDenied.module.css';

export default function AccessDenied() {
  useEffect(() => {
    const canvas = document.getElementById('matrixCanvas');
    const context = canvas.getContext('2d');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const matrixSymbols = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const fontSize = 16;
    const columns = canvas.width / fontSize;
    const drops = Array(Math.floor(columns)).fill(1);

    function drawMatrix() {
      context.fillStyle = 'rgba(0, 0, 0, 0.05)';
      context.fillRect(0, 0, canvas.width, canvas.height);

      context.fillStyle = '#0f0'; // Green text
      context.font = `${fontSize}px monospace`;

      drops.forEach((y, x) => {
        const text = matrixSymbols[Math.floor(Math.random() * matrixSymbols.length)];
        context.fillText(text, x * fontSize, y * fontSize);

        if (y * fontSize > canvas.height && Math.random() > 0.975) {
          drops[x] = 0;
        }
        drops[x]++;
      });
    }

    const intervalId = setInterval(drawMatrix, 50);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className={styles.container}>
      <canvas id="matrixCanvas" className={styles.canvas}></canvas>
      <div className={styles.glitchBox}>
        <h1 className={styles.glitchText}>ACCESS GRANTED</h1>
      </div>
    </div>
  );
}
