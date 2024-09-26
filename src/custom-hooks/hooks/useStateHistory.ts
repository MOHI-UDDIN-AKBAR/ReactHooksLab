import { useCallback, useRef, useState } from 'react';

type UseStateHistoryReturnType = [
  number,
  (value: number | ((prevValue: number) => number)) => void,
  number[],
  number,
  () => void,
  () => void,
  (index: number) => void,
];

const useStateHistory = (
  initialValue: number,
  maxHistoryLength: number = 10
): UseStateHistoryReturnType => {
  const [currentState, setCurrentState] = useState(initialValue);
  const stateHistoryRef = useRef([initialValue]);
  const currentPositionRef = useRef(0);

  const updateState = useCallback(
    (value: number | ((prevValue: number) => number)) => {
      if (currentPositionRef.current >= maxHistoryLength) return;

      const resolveValue =
        typeof value === 'function' ? value(currentState) : value;

      if (currentPositionRef.current !== stateHistoryRef.current.length - 1) {
        stateHistoryRef.current = [
          ...stateHistoryRef.current.slice(0, currentPositionRef.current + 1),
          resolveValue,
        ];
      } else {
        stateHistoryRef.current.push(resolveValue);
      }

      currentPositionRef.current = currentPositionRef.current + 1;
      setCurrentState(resolveValue);
    },
    [currentState, maxHistoryLength]
  );

  const back = () => {
    if (currentPositionRef.current > 0) {
      currentPositionRef.current -= 1;
      setCurrentState(stateHistoryRef.current[currentPositionRef.current]);
    }
  };

  const forward = () => {
    const historyLength = stateHistoryRef.current.length;
    if (currentPositionRef.current < historyLength - 1) {
      currentPositionRef.current += 1;
      setCurrentState(stateHistoryRef.current[currentPositionRef.current]);
    }
  };

  const goAt = (index: number) => {
    currentPositionRef.current = index;
    setCurrentState(stateHistoryRef.current[currentPositionRef.current]);
  };

  return [
    currentState,
    updateState,
    stateHistoryRef.current,
    currentPositionRef.current,
    back,
    forward,
    goAt,
  ];
};

export default useStateHistory;
