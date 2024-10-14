import { useState } from 'react';
import useEffectOnce from '../hooks/useEffectOnce';

const EffectOnceComponent = () => {
  const [count, setCount] = useState(0);
  useEffectOnce(() => alert('Hi'));
  return (
    <div className="effect-once-container">
      <p className="value">{count}</p>
      <button
        type="button"
        onClick={() => setCount((prevCount) => prevCount + 1)}
      >
        Increment
      </button>
    </div>
  );
};

export default EffectOnceComponent;
