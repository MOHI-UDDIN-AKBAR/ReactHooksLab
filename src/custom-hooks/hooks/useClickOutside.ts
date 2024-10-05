import { useEffect, useState } from 'react';
import useEventListener from './useEventListener';

const useClickOutside = (
  onClickOutside: () => void,
  ref: React.RefObject<HTMLElement>,
  buttonId: string
) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Version- One
  //   useEffect(() => {
  //     const handleClickOutside = (e: MouseEvent) => {
  //       const element = ref.current;
  //       const target = e.target as Element;
  //       if (target !== element && target.id !== buttonId) {
  //         onClickOutside();
  //       }
  //     };

  //     if (isModalOpen) {
  //       document.addEventListener('click', handleClickOutside);
  //     }
  //     return () => {
  //       document.removeEventListener('click', handleClickOutside);
  //     };
  //   }, [ref, onClickOutside, isModalOpen, buttonId]);

  // Version - Two
  useEventListener<MouseEvent>(
    document,
    'click',
    (e: MouseEvent) => {
      const element = ref.current;
      const target = e.target as Element;
      if (target !== element && target.id !== buttonId) {
        onClickOutside();
      }
    },
    isModalOpen
  );
  return { isModalOpen, setIsModalOpen };
};

export default useClickOutside;
