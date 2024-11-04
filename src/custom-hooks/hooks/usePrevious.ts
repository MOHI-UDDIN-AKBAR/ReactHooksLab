import { useRef } from 'react';

const usePrevious = (value: number) => {
  const previousRef = useRef<number | null>(null);
  const currentRef = useRef(value);

  if (currentRef.current !== value) {
    previousRef.current = currentRef.current;
    currentRef.current = value;
  }

  return { previousValue: previousRef.current };
};

export default usePrevious;
