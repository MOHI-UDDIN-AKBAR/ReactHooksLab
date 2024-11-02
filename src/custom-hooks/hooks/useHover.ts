import { useEffect, useState } from 'react';

const useHover = (ref: React.RefObject<HTMLDivElement | null>) => {
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const handleMouseEnter = (e: MouseEvent) => setIsHovered(true);
    const handleMouseLeave = (e: MouseEvent) => setIsHovered(false);

    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseout', handleMouseLeave);
    return () => {
      element.addEventListener('mouseenter', handleMouseEnter);
      element.addEventListener('mouseout', handleMouseLeave);
    };
  }, [ref]);

  return isHovered;
};

export default useHover;
