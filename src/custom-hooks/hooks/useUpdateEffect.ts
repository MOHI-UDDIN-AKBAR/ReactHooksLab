import { useEffect, useRef } from 'react';

const useUpdateEffect = (callback: () => void) => {
  const firstRenderRef = useRef(true);

  useEffect(() => {
    if (firstRenderRef.current) {
      firstRenderRef.current = false;
      return;
    }
    callback();
  }, [callback]);
};

export default useUpdateEffect;
