import { useRef, useLayoutEffect, useState } from 'react';

const UseLayoutEffectPractice = () => {
  const [show, setShow] = useState<boolean>(false);
  const headerRef = useRef<null | HTMLHeadingElement>(null);
  const buttonRef = useRef<null | HTMLButtonElement>(null);

  useLayoutEffect(() => {
    const headerElement = headerRef.current;

    if (!headerElement || !buttonRef.current) return;

    const { top } = headerElement.getBoundingClientRect();
    headerElement.style.top = `${top + 50}px`;

    return () => {
      headerElement.style.top = '';
    };
  }, [show]);

  return (
    <div className="toggle-header">
      <button
        ref={buttonRef}
        type="button"
        className="btn"
        onClick={() => setShow((prev) => !prev)}
      >
        Toggle
      </button>

      {show && (
        <h1 ref={headerRef} className="simple-header">
          This is a header
        </h1>
      )}
    </div>
  );
};

export default UseLayoutEffectPractice;
