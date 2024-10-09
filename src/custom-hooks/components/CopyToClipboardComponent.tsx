import { useMemo } from 'react';
import useCopyToClipboard from '../hooks/useCopyToClipboard';

const CopyToClipboardComponent = () => {
  const { copyToClipboard, success } = useCopyToClipboard();

  const demoText = useMemo(() => 'This is a normal Text', []);

  return (
    <div className="copy-to-clipboard">
      <button
        type="button"
        className="copy-btn"
        onClick={() => copyToClipboard(demoText)}
      >
        {success ? 'copied' : 'copy'}
      </button>
      <input
        type="text"
        title="paste-copy-text"
        placeholder="paste your text here..."
      />
    </div>
  );
};

export default CopyToClipboardComponent;
