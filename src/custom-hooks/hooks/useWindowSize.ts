import { useState } from 'react';
import useEventListener from './useEventListener';

type Size = {
  width: number;
  height: number;
};

const useWindowSize = () => {
  const [size, setSize] = useState<Size>({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEventListener<UIEvent>(window, 'resize', (e: UIEvent) => {
    setSize({ width: window.innerWidth, height: window.innerHeight });
  });

  return { size };
};

export default useWindowSize;
