import { useCallback, useState } from 'react';

const useStateWithValidation = (
  callback: (value: string) => boolean,
  initialState: string
) => {
  const [state, setState] = useState(initialState);
  const [isValid, setIsValid] = useState(false);

  const onChange = useCallback(
    (value: string | (() => string)) => {
      const updatedValue = typeof value === 'string' ? value : value();
      setIsValid(callback(updatedValue));
      setState(updatedValue);
    },
    [callback]
  );

  return { username: state, setUsername: onChange, isValid };
};

export default useStateWithValidation;
