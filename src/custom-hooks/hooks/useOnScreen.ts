import { useEffect, useRef, useState } from 'react';

const useOnScreen = (
  elementRef: React.MutableRefObject<HTMLParagraphElement | null>,
  rootMargin: string = '-100px',
  thresholds: number[] = [0]
) => {
  const [isVisible, setIsVisible] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;
    if (!observerRef.current) {
      observerRef.current = new IntersectionObserver(
        ([entry]) => {
          setIsVisible(entry.isIntersecting);
        },
        {
          rootMargin,
          threshold: thresholds,
        }
      );
    }
    observerRef.current.observe(element);
    return () => {
      if (observerRef.current) {
        observerRef.current.unobserve(element);
        observerRef.current.disconnect();
        observerRef.current = null;
      }
    };
  }, [elementRef, rootMargin]);

  return { isVisible };
};

export default useOnScreen;
