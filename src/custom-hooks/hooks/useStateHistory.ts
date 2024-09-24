import { useState } from "react";

const useStateHistory = (initialState: number[]) => {
  const [stateHistory, setStateHistory] = useState(initialState);
  const [currentPosition, setCurrentPosition] = useState(
    stateHistory.length - 1
  );
  const [currentValue, setCurrentValue] = useState(
    stateHistory[currentPosition]
  );

  const updateStateHistory = (value: number) => {
    setStateHistory((prevHistory) => {
      const newStateHistory = [
        ...prevHistory.slice(0, currentPosition + 1),
        value,
      ];

      const newPosition = newStateHistory.length - 1;
      setCurrentPosition(newPosition);
      setCurrentValue(newStateHistory[newPosition]);

      return newStateHistory;
    });
  };

  const double = () => {
    const value = stateHistory[currentPosition] * 2;
    updateStateHistory(value);
  };

  const increment = () => {
    const value = stateHistory[currentPosition] + 1;
    updateStateHistory(value);
  };

  const goBack = () => {
    if (currentPosition > 0) {
      const newPosition = currentPosition - 1;
      setCurrentPosition(newPosition);
      setCurrentValue(stateHistory[newPosition]);
    }
    console.log(currentPosition, currentValue);
  };

  const goForward = () => {
    if (currentPosition < stateHistory.length - 1) {
      const newPosition = currentPosition + 1;
      setCurrentPosition(newPosition);
      setCurrentValue(stateHistory[newPosition]);
    }
    console.log(currentPosition, currentValue);
  };

  const goToSpecificPosition = (position: number) => {
    if (typeof stateHistory[position] === "number") {
      setCurrentPosition(position);
      setCurrentValue(stateHistory[position]);
    }
  };

  return {
    stateHistory,
    currentPositionValue: currentValue,
    currentPosition: currentPosition,
    double,
    increment,
    goBack,
    goForward,
    goToSpecificPosition,
  };
};

export default useStateHistory;
