import { useRef } from 'react';
import useLongPress from '../hooks/useLongPress';

const LongPressComponent = () => {
  const longPressRef = useRef<null | HTMLDivElement>(null);
  useLongPress(longPressRef, () => alert('Hi'));
  return <div className="long-press-container" ref={longPressRef}></div>;
};

export default LongPressComponent;
