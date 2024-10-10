import React, { useState } from 'react';
import useDebounce from '../hooks/useDebounce';

const DELAY = 2000;

const DebounceComponent = () => {
  const [count, setCount] = useState(10);
  useDebounce(() => alert(count), DELAY);
  return (
    <div className="debounce-container">
      <p className="current-value">{count}</p>
      <button
        type="button"
        className="increment-btn"
        onClick={() => setCount((prev) => prev + 1)}
      >
        Increment
      </button>
    </div>
  );
};

export default DebounceComponent;
