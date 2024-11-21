import React, { useState } from 'react';
import useUpdateEffect from '../hooks/useUpdateEffect';

const UpdateEffectComponent = () => {
  const [count, setCount] = useState(10);
  useUpdateEffect(() => alert(count));
  return (
    <div className="update-effect-container">
      <p className="current-value">{count}</p>
      <button
        type="button"
        className="increment"
        onClick={() => setCount((prev) => prev + 1)}
      >
        Increment
      </button>
    </div>
  );
};

export default UpdateEffectComponent;
