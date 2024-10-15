import { useState } from 'react';
import useEventListener from '../hooks/useEventListener';

const EventListenerComponent = () => {
  const [key, setKey] = useState('');

  useEventListener<KeyboardEvent>(document, 'keyup', (e: KeyboardEvent) => {
    setKey(e.key);
  });
  return (
    <div className="event-listener-container">
      <p className="last-key">Last Key : {key}</p>
    </div>
  );
};

export default EventListenerComponent;
