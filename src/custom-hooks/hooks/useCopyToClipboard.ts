import copy from 'copy-to-clipboard';
import { useState } from 'react';

const useCopyToClipboard = () => {
  const [state, setState] = useState(() => ({
    value: '',
    success: false,
  }));

  const copyToClipboard = (
    text: string,
    options?: { debug?: boolean; message: string }
  ) => {
    try {
      const result = copy(text);
      setState({ value: text, success: result });
      if (result) {
        setTimeout(
          () => setState((prev) => ({ ...prev, success: false })),
          2000
        );
      }
    } catch (e) {
      setState((prev) => ({ ...prev, success: false }));
    }
  };

  return { copyToClipboard, success: state.success, value: state.value };
};

export default useCopyToClipboard;
