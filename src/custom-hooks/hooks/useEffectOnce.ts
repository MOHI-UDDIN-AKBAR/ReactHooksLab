import { useEffect } from 'react';

const useEffectOnce = (callback: () => void) => {
  useEffect(() => {
    callback();
  }, []);
};

export default useEffectOnce;
