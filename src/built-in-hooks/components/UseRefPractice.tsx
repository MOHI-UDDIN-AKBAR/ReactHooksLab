import { useEffect, useRef, useState } from "react";

const UseRefPractice = () => {
  const [name, setName] = useState<string>("");
  const inputRef = useRef<HTMLInputElement | null>(null);
  const renderCount = useRef<number>(1);
  const prevName = useRef<string>("");
  const currName = useRef<string>(name);

  const focusInput = () => {
    inputRef.current?.focus();
  };

  useEffect(() => {
    renderCount.current += 1;
  });

  const handleSubmitEvent = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (prevName.current !== name) {
      prevName.current = currName.current;
      currName.current = name;
    }
    setName("");
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmitEvent}>
        <input
          ref={inputRef}
          type="text"
          title="name"
          value={name}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setName(e.target.value)
          }
        />
        <button className="btn" type="submit">
          Submit
        </button>
      </form>

      <button className="btn" type="button" onClick={focusInput}>
        Focus on input
      </button>
      <p className="render-count">
        This Component Rendered {renderCount.current} times
      </p>

      <p>Previous name: {prevName.current}</p>
    </div>
  );
};

export default UseRefPractice;
