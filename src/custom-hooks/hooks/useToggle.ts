import { useState } from 'react';

const useToggle = (initialState: boolean) => {
  const [isToggled, setIsToggled] = useState(initialState);

  const toggle = () => setIsToggled((prev) => !prev);
  const enable = (value: boolean) => setIsToggled(value);
  const disable = (value: boolean) => setIsToggled(value);

  return { isToggled, toggle, enable, disable };
};

export default useToggle;
