import { useState, useEffect, useRef } from 'react';

export const useCountUp = (end, duration = 2000, startWhen = true, resetKey = 0) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!startWhen) {
      setCount(0);
      return;
    }

    let startTime;
    let animationFrame;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - percentage, 4);

      setCount(Math.floor(end * easeOutQuart));

      if (percentage < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [end, duration, startWhen, resetKey]);

  return count;
};

export const AnimatedCounter = ({ value, suffix = '', prefix = '', replayOnView = true }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [resetKey, setResetKey] = useState(0);
  const ref = useRef(null);
  const wasVisible = useRef(false);
  const count = useCountUp(value, 1500, isVisible, resetKey);

  useEffect(() => {
    const currentRef = ref.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Only reset if we were previously not visible and replayOnView is enabled
          if (replayOnView && wasVisible.current) {
            setResetKey(prev => prev + 1);
          }
          setIsVisible(true);
          wasVisible.current = true;
        } else if (replayOnView) {
          setIsVisible(false);
        }
      },
      { threshold: 0.1 }
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [replayOnView]);

  return (
    <span ref={ref}>
      {prefix}{count}{suffix}
    </span>
  );
};
