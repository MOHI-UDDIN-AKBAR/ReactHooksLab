import { useEffect, useRef, useState } from 'react';

type Size = DOMRectReadOnly | null;

const useSize = (
  elementRef: React.MutableRefObject<HTMLTextAreaElement | null>
) => {
  const [size, setSize] = useState<Size>(null);
  const observerRef = useRef<ResizeObserver | null>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    if (!observerRef.current) {
      observerRef.current = new ResizeObserver(([entry]) =>
        setSize(entry.contentRect)
      );
    }
    observerRef.current.observe(element);
    return () => {
      observerRef.current?.disconnect();
      observerRef.current = null;
    };
  }, [elementRef]);

  return size;
};

export default useSize;
