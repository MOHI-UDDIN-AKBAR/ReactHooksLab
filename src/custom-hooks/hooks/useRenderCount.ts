import { useEffect, useRef } from 'react';

const useRenderCount = () => {
  const renderRef = useRef(1);
  useEffect(() => {
    renderRef.current += 1;
  });

  return renderRef.current;
};

export default useRenderCount;
