import { useState } from 'react';
import usePrevious from '../hooks/usePrevious';

const PreviousComponent = () => {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('Samir');
  const { previousValue } = usePrevious(count);

  return (
    <div className="previous-container">
      <div className="values">
        <p className="previous-value">
          Previous Value :{' '}
          {typeof previousValue === 'number' ? previousValue : 'null'}
        </p>
        <p className="current-value">Current Value : {count}</p>
      </div>
      <p className="name">{name}</p>
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
          className="increment-btn"
          onClick={() => setName('Rifat')}
        >
          Change Name
        </button>
      </div>
    </div>
  );
};

export default PreviousComponent;
