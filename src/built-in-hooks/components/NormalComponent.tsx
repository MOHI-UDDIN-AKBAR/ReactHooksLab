import React, { useContext } from "react";
import { themeContext } from "./UseContextPractice";

const NormalComponent = () => {
  const context = useContext(themeContext);
  if (context === undefined) return null;
  const { isDark, setIsDark } = context;
  const theme = {
    backgroundColor: isDark ? "black" : "grey",
    color: isDark ? "white" : "black",
  };

  return (
    <div>
      <button
        className="btn"
        type="button"
        onClick={() => setIsDark((prev) => !prev)}
      >
        Toggle theme
      </button>
      <div
        style={{
          backgroundColor: theme.backgroundColor,
          color: theme.color,
          padding: "3rem",
          margin: "3rem",
        }}
      >
        Normal Component
      </div>
    </div>
  );
};

export default NormalComponent;
