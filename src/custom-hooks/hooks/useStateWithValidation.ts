import { useCallback, useState } from 'react';
import { Person, IsValid } from '../components/StateWithValidationComponent';

const useStateWithValidation = (
  validate: (value: string) => boolean,
  initialState: Person,
  initialIsValid: IsValid
) => {
  const [state, setState] = useState(() => initialState);
  const [isValid, setIsValid] = useState(initialIsValid);

  const handleChange = useCallback(
    (value: string | ((value: string) => string), key: keyof Person) => {
      const updatedValue =
        typeof value === 'string' ? value : value(state[key]);

      setIsValid((prev) => ({
        ...prev,
        [key]: validate(updatedValue),
      }));

      setState((prevPerson) => ({ ...prevPerson, [key]: updatedValue }));
    },
    [validate, state]
  );

  return { state, setState, handleChange, isValid };
};

export default useStateWithValidation;
