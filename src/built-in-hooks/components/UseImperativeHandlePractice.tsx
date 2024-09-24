import { forwardRef, useImperativeHandle, useRef, useState } from "react";

type ModalButtonRefType = {
  cancelFocus: () => void;
  confirmFocus: () => void;
  denyFocus: () => void;
};

const Modal = forwardRef<
  ModalButtonRefType,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>((props, ref) => {
  const confirmRef = useRef<HTMLButtonElement | null>(null);
  const cancelRef = useRef<HTMLButtonElement | null>(null);
  const denyRef = useRef<HTMLButtonElement | null>(null);

  useImperativeHandle(ref, () => ({
    cancelFocus: () => {
      cancelRef.current?.focus();
    },
    confirmFocus: () => {
      confirmRef.current?.focus();
    },
    denyFocus: () => {
      denyRef.current?.focus();
    },
  }));
  console.log("how");

  return (
    <div className="modal">
      <button type="button" className="cancel-btn" ref={cancelRef}>
        X
      </button>
      <div className="modal-content">
        <h3 className="modal-title">Title</h3>
        <div className="modal-body">
          <p>Do you confirm?</p>
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

const UseImperativeHandlePractice = () => {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<ModalButtonRefType | null>(null);

  const renderModal = isOpen ? <Modal ref={buttonRef} /> : null;

  return (
    <div className="container">
      <button
        type="button"
        className="open-btn"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        Open
      </button>
      <div className="action-buttons">
        <button
          type="button"
          className="open-btn"
          onClick={() => buttonRef.current?.cancelFocus()}
        >
          Focus Close
        </button>{" "}
        <button
          type="button"
          className="open-btn"
          onClick={() => buttonRef.current?.confirmFocus()}
        >
          Focus Confirm
        </button>{" "}
        <button
          type="button"
          className="open-btn"
          onClick={() => buttonRef.current?.denyFocus()}
        >
          Focus Deny
        </button>
      </div>
      {renderModal}
    </div>
  );
};

export default UseImperativeHandlePractice;
