import { useRef } from 'react';
import useHover from '../hooks/useHover';

const HoverComponent = () => {
  const hoverRef = useRef<HTMLDivElement | null>(null);
  const isHovered = useHover(hoverRef);
  return (
    <div
      className="hover-container"
      ref={hoverRef}
      style={{ backgroundColor: isHovered ? 'green' : 'blue' }}
    ></div>
  );
};

export default HoverComponent;
