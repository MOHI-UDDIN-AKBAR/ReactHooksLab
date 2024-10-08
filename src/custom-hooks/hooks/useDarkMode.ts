import { useLayoutEffect, useState } from 'react';
import useMediaQuery from './useMediaQuery';

const useDarkMode = () => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const savedValue = localStorage.getItem('darkMode');
    return savedValue !== null ? JSON.parse(savedValue) : prefersDarkMode;
  });

  useLayoutEffect(() => {
    const enabledDarkMode = darkMode ?? prefersDarkMode;
    document.body.classList.toggle('dark-mode', enabledDarkMode);
    localStorage.setItem('darkMode', String(enabledDarkMode));
  }, [prefersDarkMode, darkMode]);

  return { darkMode, setDarkMode };
};

export default useDarkMode;
