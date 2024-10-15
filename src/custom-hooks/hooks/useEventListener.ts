import { useCallback, useEffect } from 'react';

type EventTargetElement = Window | Document | HTMLElement | MediaQueryList;

const useEventListener = <T>(
  element: EventTargetElement = document,
  eventType: string = 'keyup',
  handler: (e: T) => void,
  active: boolean = true
) => {
  const eventListener = useCallback(
    (e: Event) => {
      handler(e as T);
    },
    [handler]
  );

  useEffect(() => {
    if (!element || !element.addEventListener || !active) return;

    element.addEventListener(eventType, eventListener);
    return () => {
      element.removeEventListener(eventType, eventListener);
    };
  }, [element, eventType, eventListener, active]);
};

export default useEventListener;
