import { useState } from 'react';
import Cookies from 'js-cookie';

const useCookie = (name: string, initialValue: string) => {
  const [value, setName] = useState<string | null>(() => {
    const savedCookie = Cookies.get(name);
    if (savedCookie) return savedCookie;
    Cookies.set(name, initialValue, { expires: 2 });
    return initialValue;
  });

  const updateCookie = (
    newValue: string,
    option: { expires: number; path: string }
  ) => {
    Cookies.set(name, newValue, option);
    setName(newValue);
  };

  const removeCookie = () => {
    Cookies.remove(name);
    setName(null);
  };

  return { value, updateCookie, removeCookie };
};

export default useCookie;
