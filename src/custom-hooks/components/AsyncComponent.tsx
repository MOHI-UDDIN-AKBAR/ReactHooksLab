import { useCallback } from 'react';
import useAsync from '../hooks/useAsync';

const AsyncComponent = () => {
  const { isLoading, error, value } = useAsync<string>(
    useCallback(
      () =>
        new Promise((resolve, reject) => {
          const success = false;
          const timeoutId = setTimeout(() => {
            clearTimeout(timeoutId);
            if (success) {
              return resolve('Hi');
            } else {
              reject(new Error('Error'));
            }
          }, 2000);
        }),
      []
    )
  );

  return (
    <div className="async-container">
      <p className="loader">Loading : {isLoading.toString()}</p>
      {value && <p className="value">{value}</p>}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default AsyncComponent;
