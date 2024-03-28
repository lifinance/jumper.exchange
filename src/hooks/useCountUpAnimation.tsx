'use client';
import { useEffect, useState } from 'react';

const easeOutQuad = (t: number) => t * (2 - t);
const frameDuration = 1000 / 60;

interface UseCountUpAnimationProps {
  children: string;
  duration?: number;
  delay?: number;
}

export const useCountUpAnimation = ({
  children,
  duration = 2000,
  delay = 300,
}: UseCountUpAnimationProps) => {
  const countTo = parseInt(children, 10);
  const [count, setCount] = useState(0);

  useEffect(() => {
    let frame = 0;
    const totalFrames = Math.round(duration / frameDuration);

    const startAnimation = () => {
      const counter = setInterval(() => {
        frame++;
        const progress = easeOutQuad(frame / totalFrames);
        setCount(countTo * progress);

        if (frame === totalFrames) {
          clearInterval(counter);
        }
      }, frameDuration);
    };

    const timeout = setTimeout(startAnimation, delay);

    return () => {
      clearTimeout(timeout);
    };
  }, [countTo, duration, delay]);

  return Math.floor(count);
};
