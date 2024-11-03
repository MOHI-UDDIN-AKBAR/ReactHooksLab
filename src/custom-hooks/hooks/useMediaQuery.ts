import { useEffect, useState } from 'react';
import useEventListener from './useEventListener';

const useMediaQuery = (mediaQuery: string) => {
  const [isMatched, setIsMatched] = useState(false);
  const [mediaQueryList, setMediaQueryList] = useState<MediaQueryList>();

  useEffect(() => {
    const list = window.matchMedia(mediaQuery);
    setIsMatched(list.matches);
    setMediaQueryList(list);
  }, [mediaQuery]);

  useEventListener<MediaQueryListEvent>(
    mediaQueryList,
    'change',
    (e: MediaQueryListEvent) => {
      setIsMatched(e.matches);
    }
  );

  return isMatched;
};

export default useMediaQuery;
