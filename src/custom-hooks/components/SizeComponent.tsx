import { useRef } from 'react';
import useSize from '../hooks/useSize';

const SizeComponent = () => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const size = useSize(textareaRef);
  return (
    <div className="size-container">
      <p className="values">Size : {size && JSON.stringify(size)}</p>
      <textarea
        ref={textareaRef}
        title="textarea"
        name="textarea"
        id="textarea"
        cols={20}
        rows={5}
      ></textarea>
    </div>
  );
};

export default SizeComponent;
