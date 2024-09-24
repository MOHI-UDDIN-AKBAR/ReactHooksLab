import { useState } from "react";
import useStateHistory from "../hooks/useStateHistory";

const StateHistoryComponent = () => {
  const [name, setName] = useState("Rifat");
  const {
    stateHistory,
    currentPositionValue,
    currentPosition,
    double,
    increment,
    goBack,
    goForward,
    goToSpecificPosition,
  } = useStateHistory([1]);

  return (
    <div className="state-history-container">
      <div className="histories">
        <p className="current-position-value">{currentPositionValue}</p>
        <p className="full-state">{stateHistory.join(" ").toString()}</p>
        <p className="current-position">{currentPosition}</p>
        <p className="name">{name}</p>
      </div>
      <div className="action-buttons">
        <button
          type="button"
          className="double-element__btn"
          onClick={() => double()}
        >
          Double
        </button>
        <button type="button" className="increment__btn" onClick={increment}>
          Increment
        </button>
        <button type="button" className="back__btn" onClick={goBack}>
          Back
        </button>
        <button type="button" className="forward__btn" onClick={goForward}>
          Forward
        </button>
        <button
          type="button"
          className="specific-position__btn"
          onClick={() => goToSpecificPosition(2)}
        >
          Go To Index 2
        </button>
        <button
          type="button"
          className="update-name__btn"
          onClick={() => setName("Samir")}
        >
          Update Name
        </button>
      </div>
    </div>
  );
};

export default StateHistoryComponent;
