import { useCallback, useEffect, useRef } from 'react';

const useTimeout = (callback: () => void, delay: number) => {
  const timeoutRef = useRef<null | ReturnType<typeof setTimeout>>(null);
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  const startTimeout = useCallback(() => {
    timeoutRef.current = setTimeout(() => callbackRef.current(), delay);
  }, [delay]);

  const removeTimeout = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  const resetTimeout = () => {
    removeTimeout();
    startTimeout();
  };

  useEffect(() => {
    startTimeout();
    return () => removeTimeout();
  }, [startTimeout, removeTimeout]);

  return { removeTimeout, resetTimeout };
};

export default useTimeout;
