import { useState } from 'react';
import useDebugInfo from '../hooks/useDebugInfo';

type TProps = {
  count: number;
  boolean: boolean;
};

const ChildComponent = (props: TProps) => {
  const { count, boolean } = props;
  const info = useDebugInfo(props, 'childComponent');

  return (
    <div className="values">
      <p className="toggle-value">{boolean.toString()}</p>
      <p className="increment-value">{count}</p>
      <p className="info-values">{JSON.stringify(info)}</p>
    </div>
  );
};

const DebugInfoComponent = () => {
  const [boolean, setBoolean] = useState(false);
  const [count, setCount] = useState(0);

  return (
    <div className="debug-info-container">
      <ChildComponent boolean={boolean} count={count} />

      <div className="actions-buttons">
        <button
          type="button"
          className="increment-btn"
          onClick={() => setCount((p) => p + 1)}
        >
          Increment
        </button>
        <button
          type="button"
          className="toggle-btn"
          onClick={() => setBoolean((p) => !p)}
        >
          Toggle
        </button>
      </div>
    </div>
  );
};

export default DebugInfoComponent;
