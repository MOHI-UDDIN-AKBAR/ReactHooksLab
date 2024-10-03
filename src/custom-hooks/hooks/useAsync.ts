import { useCallback, useEffect, useState } from 'react';

const useAsync = <T>(callback: () => Promise<T>) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);
  const [value, setValue] = useState<T | null>(null);

  const handlePromise = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await callback();
      setValue(result);
    } catch (e: unknown) {
      if (e instanceof Error) {
        setError(e.message);
      } else setError('Unknown error');
    } finally {
      setIsLoading(false);
    }
  }, [callback]);

  useEffect(() => {
    handlePromise();
  }, [handlePromise]);

  return { isLoading, error, value };
};

export default useAsync;
