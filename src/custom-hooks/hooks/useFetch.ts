import { useCallback } from 'react';
import useAsync from './useAsync';

export type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

type UseFetchReturnType = {
  isLoading: boolean;
  error: string | null;
  value: Post | null;
};

const DEFAULT_OPTIONS = {
  headers: { 'Content-Type': 'application/json' },
};

const useFetch = (
  apiUrl: string,
  method: string,
  id: number
): UseFetchReturnType => {
  const callback = useCallback(async () => {
    const response = await fetch(`${apiUrl}/${id}`, {
      method: method,
      ...DEFAULT_OPTIONS,
    });
    if (!response.ok) {
      throw new Error('Failed to fetch');
    }
    return (await response.json()) as Post;
  }, [id, apiUrl, method]);

  return useAsync<Post>(callback);
};

export default useFetch;
