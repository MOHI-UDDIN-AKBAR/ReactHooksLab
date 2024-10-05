import { useMemo, useRef } from 'react';
import useClickOutside from '../hooks/useClickOutside';

const modalStyle = {
  fontSize: '2rem',
  backgroundColor: '#1f2633',
  color: 'white',
  width: 200,
  height: 130,
  display: 'grid',
  placeItems: 'center',
};

const ClickOutsideComponent = () => {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const openButtonId = useMemo(() => 'open-modal-button', []);
  const { isModalOpen, setIsModalOpen } = useClickOutside(
    () => setIsModalOpen(false),
    modalRef,
    openButtonId
  );

  return (
    <div className="click-outside-container">
      <button
        type="button"
        className="open-modal-btn"
        id={openButtonId}
        onClick={() => setIsModalOpen(true)}
      >
        Open
      </button>
      {isModalOpen && (
        <div className="modal" ref={modalRef} style={modalStyle}>
          Modal
        </div>
      )}
    </div>
  );
};

export default ClickOutsideComponent;
