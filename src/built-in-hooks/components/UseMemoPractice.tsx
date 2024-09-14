import { useMemo, useState } from "react";

const UseMemoPractice = () => {
  const [number, setNumber] = useState<number>(0);
  const [isDark, setIsDark] = useState<boolean>(false);

  const styleTheme = {
    backgroundColor: isDark ? "black" : "white",
    color: isDark ? "white" : "black",
  };

  const doubleNumber = useMemo((): number => {
    for (let i = 0; i < 1000000000; i++) {}
    return number * 2;
  }, [number]);

  return (
    <div className="container">
      <div className="input">
        <input
          type="number"
          title="number"
          value={number}
          onChange={(e) => setNumber(Number(e.target.value))}
        />
      </div>
      <button
        className="btn"
        type="button"
        onClick={() => setIsDark((prev) => !prev)}
      >
        toggle Theme
      </button>
      <div
        className="display-number"
        style={{
          backgroundColor: styleTheme.backgroundColor,
          color: styleTheme.color,
        }}
      >
        <h1 className="number">{doubleNumber}</h1>
      </div>
    </div>
  );
};

export default UseMemoPractice;
