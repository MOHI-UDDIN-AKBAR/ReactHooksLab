import { useCallback, useState } from 'react';
import useStateHistory from '../hooks/useStateHistory';

const StateHistoryComponent = () => {
  const [username, setUsername] = useState('Samir');

  const [count, setCount, state, position, back, forward, goAt] =
    useStateHistory(1);

  const changeName = useCallback(() => setUsername('Rifat'), []);

  return (
    <div className="history-container">
      <div className="histories">
        <p className="current-value">{count}</p>
        <p className="state-history">{state.join(' ').toString()}</p>
        <p className="current-position">{position}</p>
        <p className="username">{username}</p>
      </div>
      <div className="state-history-actions">
        <button
          type="button"
          className="double__btn"
          onClick={() => setCount((prevCount) => prevCount * 2)}
        >
          Double
        </button>
        <button
          type="button"
          className="increment__btn"
          onClick={() => setCount((prevCount) => prevCount + 1)}
        >
          Increment
        </button>
        <button type="button" className="back__btn" onClick={back}>
          Back
        </button>
        <button type="button" className="forward__btn" onClick={forward}>
          Forward
        </button>
        <button
          type="button"
          className="go-specific-position__btn"
          onClick={() => goAt(2)}
        >
          Go To Position 2
        </button>
        <button type="button" className="change-name__btn" onClick={changeName}>
          Change Name
        </button>
      </div>
    </div>
  );
};

export default StateHistoryComponent;
