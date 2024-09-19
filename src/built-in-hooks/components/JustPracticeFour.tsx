import {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

type CustomRef = {
  focusCancelBtn: () => void;
  focusConfirmBtn: () => void;
  focusDenyBtn: () => void;
};

const Modal = forwardRef<
  CustomRef,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>((props, ref) => {
  const cancelRef = useRef<HTMLButtonElement | null>(null);
  const confirmRef = useRef<HTMLButtonElement | null>(null);
  const denyRef = useRef<HTMLButtonElement | null>(null);

  const focusCancelBtn = useCallback(() => cancelRef.current?.focus(), []);
  const focusConfirmBtn = useCallback(() => confirmRef.current?.focus(), []);
  const focusDenyBtn = useCallback(() => denyRef.current?.focus(), []);

  useImperativeHandle(ref, () => ({
    focusCancelBtn,
    focusConfirmBtn,
    focusDenyBtn,
  }));

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <button type="button" className="cancel-btn" ref={cancelRef}>
            X
          </button>
          <h2 className="modal-title">Title</h2>
        </div>
        <div className="modal-body">
          <button type="button" className="confirm-btn" ref={confirmRef}>
            Yes
          </button>
          <button type="button" className="deny-btn" ref={denyRef}>
            No
          </button>
        </div>
      </div>
    </div>
  );
});

const JustPracticeFour = () => {
  const [shouldDisplay, setShouldDisplay] = useState(false);
  const customRef = useRef<CustomRef | null>(null);

  const toggleModal = useCallback(() => setShouldDisplay((prev) => !prev), []);

  return (
    <div className="container">
      <button className="toggle" type="button" onClick={toggleModal}>
        {shouldDisplay ? "Hide" : "Show"}
      </button>
      {shouldDisplay && (
        <div className="buttons">
          <button
            type="button"
            className="focus-cancel-btn"
            onClick={() => customRef.current?.focusCancelBtn()}
          >
            Focus Cancel
          </button>
          <button
            type="button"
            className="focus-confirm-btn"
            onClick={() => customRef.current?.focusConfirmBtn()}
          >
            Focus Confirm
          </button>
          <button
            type="button"
            className="focus-deny-btn"
            onClick={() => customRef.current?.focusDenyBtn()}
          >
            Focus Deny
          </button>
          <Modal ref={customRef} />
        </div>
      )}
    </div>
  );
};

export default JustPracticeFour;
