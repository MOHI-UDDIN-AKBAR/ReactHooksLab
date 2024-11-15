import { useState } from 'react';
import useRenderCount from '../hooks/useRenderCount';

const RenderCountComponent = () => {
  const [count, setCounter] = useState(0);
  const renderPasses = useRenderCount();

  return (
    <div className="render-count-container">
      <p className="render-passes">{renderPasses}</p>
      <p className="count-value">{count}</p>
      <button
        type="button"
        className="increment-btn"
        onClick={() => setCounter((prevCount) => prevCount + 1)}
      >
        Increment
      </button>
    </div>
  );
};

export default RenderCountComponent;
