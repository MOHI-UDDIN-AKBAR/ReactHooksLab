import { useCallback, useEffect } from 'react';
import useEffectOnce from './useEffectOnce';
import useTimeout from './useTimeout';

const isElement = <T extends Element>(element: T | null): element is T => {
  return (
    element !== null &&
    typeof element === 'object' &&
    'addEventListener' in element
  );
};

const useEvent = <T extends Element>(
  ref: React.RefObject<T | null>,
  eventType: keyof HTMLElementEventMap,
  handler: (e: Event) => void
) => {
  const eventListener = useCallback(
    (e: Event) => {
      handler(e);
    },
    [handler]
  );

  useEffect(() => {
    const element = ref.current;
    if (!isElement(element)) return;

    element.addEventListener(eventType, eventListener);
    return () => {
      element.removeEventListener(eventType, eventListener);
    };
  }, [ref, eventType, eventListener]);
};

const useLongPress = (
  ref: React.RefObject<HTMLDivElement | null>,
  callback: () => void,
  delay: number = 1000
) => {
  const { removeTimeout, resetTimeout } = useTimeout(callback, delay);

  useEffectOnce(removeTimeout);

  useEvent(ref, 'mousedown', resetTimeout);
  useEvent(ref, 'touchstart', resetTimeout);

  useEvent(ref, 'mouseup', removeTimeout);
  useEvent(ref, 'mouseleave', removeTimeout);
  useEvent(ref, 'touchend', removeTimeout);
};

export default useLongPress;
