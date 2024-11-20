import React, { useState } from 'react';
import useTimeout from '../hooks/useTimeout';

const DELAY = 2000;
const INITIAL_COUNT = 10;

const TimeoutComponent = () => {
  const [count, setCount] = useState(INITIAL_COUNT);
  const { removeTimeout, resetTimeout } = useTimeout(() => setCount(0), DELAY);

  return (
    <div className="timeout-container">
      <p className="current-value">{count}</p>
      <div className="button">
        <button
          type="button"
          className="increment__btn"
          onClick={() => setCount((prev) => prev + 1)}
        >
          Increment
        </button>
        <button
          type="button"
          className="clear-timeout__btn"
          onClick={removeTimeout}
        >
          Clear Timeout
        </button>
        <button
          type="button"
          className="reset-timeout__btn"
          onClick={resetTimeout}
        >
          Reset Timeout
        </button>
      </div>
    </div>
  );
};

export default TimeoutComponent;
