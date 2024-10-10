import { useEffect } from 'react';
import useTimeout from './useTimeout';

const useDebounce = (callback: () => void, delay: number) => {
  const { removeTimeout, resetTimeout } = useTimeout(callback, delay);

  useEffect(() => {
    resetTimeout();
  }, [resetTimeout]);

  useEffect(() => {
    return removeTimeout();
  }, []);
};

export default useDebounce;
