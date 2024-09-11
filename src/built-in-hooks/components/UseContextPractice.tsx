import { createContext, ReactNode, useState } from "react";

type ThemeContextType = {
  isDark: boolean;
  setIsDark: React.Dispatch<React.SetStateAction<boolean>>;
};

export const themeContext = createContext<undefined | ThemeContextType>(
  undefined
);

const UseContextPractice = ({ children }: { children: ReactNode }) => {
  const [isDark, setIsDark] = useState<boolean>(false);

  return (
    <themeContext.Provider value={{ isDark, setIsDark }}>
      {children}
    </themeContext.Provider>
  );
};

export default UseContextPractice;
