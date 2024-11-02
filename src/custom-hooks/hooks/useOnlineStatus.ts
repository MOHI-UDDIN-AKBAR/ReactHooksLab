import { useState } from 'react';
import useEventListener from './useEventListener';

const useOnlineStatus = () => {
  const [status, setStatus] = useState(navigator.onLine);

  useEventListener<Event>(window, 'online', (e: Event) =>
    setStatus(navigator.onLine)
  );
  useEventListener<Event>(window, 'offline', (e: Event) =>
    setStatus(navigator.onLine)
  );

  return status;
};

export default useOnlineStatus;
