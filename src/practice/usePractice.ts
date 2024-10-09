import { isEqual } from 'lodash';
import copy from 'copy-to-clipboard';
import Cookies from 'js-cookie';

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';

type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

type TProps = {
  boolean: boolean;
  count: number;
};

const useTimeout = (callback: () => void, delay: number = 1000) => {
  const callbackRef = useRef(callback);
  const timeoutRef = useRef<null | NodeJS.Timeout>(null);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  const startTimeout = useCallback(() => {
    timeoutRef.current = setTimeout(() => {
      callbackRef.current();
    }, delay);
  }, [delay]);

  const removeTimeOut = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  const resetTimeout = useCallback(() => {
    removeTimeOut();
    startTimeout();
  }, [startTimeout, removeTimeOut]);

  useEffect(() => {
    startTimeout();
    return () => {
      removeTimeOut();
    };
  }, [startTimeout, removeTimeOut]);

  return { removeTimeOut, resetTimeout };
};

const useDebounce = (callback: () => void, delay: number) => {
  const { removeTimeOut, resetTimeout } = useTimeout(callback, delay);

  useEffect(() => {
    resetTimeout();
  }, [callback, delay, resetTimeout]);

  useEffect(() => {
    return removeTimeOut();
  }, []);
};

const useUpdateEffect = (callback: () => void) => {
  const firstRenderRef = useRef(true);
  useEffect(() => {
    if (firstRenderRef.current) {
      firstRenderRef.current = false;
      return;
    }
    callback();
  }, [callback]);
};

const usePrevious = (value: number) => {
  const prevRef = useRef<number | null>(null);
  const currentRef = useRef(value);

  if (currentRef.current !== value) {
    prevRef.current = currentRef.current;
    currentRef.current = value;
  }

  return prevRef.current;
};

const useStateHistory = (capacity: number = 10) => {
  const [count, setCount] = useState(1);
  const historyRef = useRef([count]);
  const positionRef = useRef<number>(0);

  const updateHistory = useCallback(
    (value: number | ((prev: number) => number)) => {
      const resolveValue = typeof value === 'function' ? value(count) : value;
      if (positionRef.current < capacity - 1) {
        historyRef.current = [
          ...historyRef.current.slice(0, positionRef.current + 1),
          resolveValue,
        ];
        positionRef.current += 1;
        setCount(resolveValue);
      }
    },
    [count, capacity]
  );

  const goBackward = useCallback(() => {
    if (positionRef.current > 0) {
      positionRef.current -= 1;
      setCount(historyRef.current[positionRef.current]);
    }
  }, []);

  const goForward = useCallback(() => {
    if (positionRef.current < historyRef.current.length - 1) {
      positionRef.current += 1;
      setCount(historyRef.current[positionRef.current]);
    }
  }, []);

  const goSpecificIndex = useCallback((index: number) => {
    if (historyRef.current[index] !== undefined) {
      positionRef.current = index;
      setCount(historyRef.current[positionRef.current]);
    }
  }, []);

  return {
    count,
    position: positionRef.current,
    stateHistory: historyRef.current,
    updateHistory,
    goBackward,
    goForward,
    goSpecificIndex,
  };
};

export const useLocalStorage = (key: string, value: string | null) => {
  return useStorage<typeof value>(key, value, localStorage);
};
export const useSessionStorage = (key: string, value: number | null) => {
  return useStorage<typeof value>(key, value, sessionStorage);
};

const useStorage = <T>(
  key: string,
  initialValue: T,
  storage: Storage
): [T, React.Dispatch<React.SetStateAction<T>>, (key: string) => void] => {
  const [state, setState] = useState(() => {
    const savedValue = storage.getItem(key);
    if (savedValue) {
      return JSON.parse(savedValue) as T;
    }
    return initialValue;
  });

  const remove = useCallback(
    (key: string) => {
      storage.removeItem(key);
      setState(null as T);
    },
    [storage]
  );

  useEffect(() => {
    if (!!state) {
      storage.setItem(key, JSON.stringify(state));
    }
  }, [key, storage, state]);

  return [state, setState, remove];
};

const useAsync = <T>(promise: () => Promise<T>) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [data, setData] = useState<T>();

  const handlePromise = async () => {
    try {
      setIsLoading(true);
      setError('');
      const response = await promise();
      if (response) {
        setData(response);
      } else {
        throw new Error('Failed to Handle Promise');
      }
    } catch (e: any) {
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError(e);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handlePromise();
  }, []);

  return { data, isLoading, error };
};

const useFetch = (apiUrl: string) => {
  const callback = async () => {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Failed to fetch Post');
    }
    return await response.json();
  };

  return useAsync<Post>(callback);
};

type Person = {
  age: number;
  name: string;
};

const useDeepEffect = (
  person: Person,
  elementRef: { current: HTMLSpanElement | null }
) => {
  const prevPerson = useRef(person);

  useEffect(() => {
    if (!elementRef.current) return;
    if (!isEqual(prevPerson.current, person)) {
      elementRef.current.textContent = String(
        Number(elementRef.current.textContent) + 1
      );
    }
  }, [person, elementRef]);

  useEffect(() => {
    prevPerson.current = person;
  }, [person]);
};

const useEventListener = <
  T extends HTMLElement | Document | Window | MediaQueryList,
  K,
>(
  elementRef: React.RefObject<T> | T,
  eventType: string,
  callback: (e: K) => void
) => {
  const handleEvent = useCallback(
    (e: Event) => {
      callback(e as K);
    },
    [callback]
  );

  useEffect(() => {
    const element = 'current' in elementRef ? elementRef.current : elementRef;
    if (!element) return;

    element.addEventListener(eventType, handleEvent);

    return () => {
      element.removeEventListener(eventType, handleEvent);
    };
  }, [elementRef, eventType, handleEvent]);
};

const useOnScreen = <T extends HTMLElement>(
  elementRef: React.RefObject<T>,
  margin: string
) => {
  const [isVisible, setIsVisible] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;
    if (!observerRef.current) {
      observerRef.current = new IntersectionObserver(
        ([entry]) => {
          setIsVisible(entry.isIntersecting);
        },
        { rootMargin: margin }
      );
    }
    observerRef.current.observe(element);

    return () => {
      if (observerRef.current) {
        observerRef.current.unobserve(element);
        observerRef.current.disconnect();
        observerRef.current = null;
      }
    };
  }, [elementRef, margin]);

  return isVisible;
};

const useWindowSize = () => {
  const [width, setWidth] = useState<number>(window.innerWidth);
  const [height, setHeight] = useState<number>(window.innerHeight);

  useEventListener<Window, UIEvent>(window, 'resize', () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  });

  return { width, height };
};

const useMediaQuery = (query: string) => {
  const [isMatch, setIsMatch] = useState<boolean>(false);
  const mediaQueryRef = useRef<MediaQueryList | null>(null);

  useLayoutEffect(() => {
    mediaQueryRef.current = window.matchMedia(query);
    setIsMatch(mediaQueryRef.current.matches);
    return () => {
      mediaQueryRef.current = null;
    };
  }, [query]);

  useEventListener<MediaQueryList, MediaQueryListEvent>(
    mediaQueryRef,
    'change',
    (e: MediaQueryListEvent) => {
      setIsMatch(e.matches);
    }
  );

  return isMatch;
};

type GeoLocationCoords = {
  latitude: number;
  longitude: number;
};

const useGeolocation = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [data, setData] = useState<GeoLocationCoords | null>(null);
  const locationRef = useRef<Geolocation | null>(navigator.geolocation);
  const watchPositionId = useRef<number | null>(null);

  const handleError = (err: GeolocationPositionError) => {
    setIsLoading(false);
    setError(err.message || 'Failed to get Location');
  };

  const handleLocation = (position: GeolocationPosition) => {
    if (
      position.coords &&
      position.coords.latitude &&
      position.coords.longitude
    ) {
      const { latitude, longitude } = position.coords;
      setData({ latitude, longitude });
    } else {
      setError('OOps! Not found location');
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (!locationRef.current) return;
    setIsLoading(true);
    setError('');
    locationRef.current.getCurrentPosition(handleLocation, handleError);
    watchPositionId.current = locationRef.current.watchPosition(
      handleLocation,
      handleError
    );
    return () => {
      if (watchPositionId.current && locationRef.current) {
        locationRef.current.clearWatch(watchPositionId.current);
        watchPositionId.current = null;
        locationRef.current = null;
      }
    };
  }, []);

  return { isLoading, error, data };
};

const useStateValidation = (callback: (state: string) => boolean) => {
  const [value, setValue] = useState('');
  const [isValid, setIsValid] = useState(false);

  const onChange = useCallback(
    (targetValue: string) => {
      const isTrue = callback(targetValue);
      setIsValid(isTrue);
      setValue(targetValue);
    },
    [callback]
  );

  return { isValid, value, setValue: onChange };
};

const useSize = <T extends HTMLTextAreaElement>(ref: React.RefObject<T>) => {
  const [size, setSize] = useState<DOMRectReadOnly | null>(null);
  const observeRef = useRef<ResizeObserver | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    if (!observeRef.current) {
      observeRef.current = new ResizeObserver(([entry]) => {
        setSize(entry.contentRect);
      });
    }
    observeRef.current.observe(element);
    return () => {
      if (observeRef.current) {
        observeRef.current.disconnect();
        observeRef.current = null;
      }
    };
  }, [ref]);

  return size;
};

const useClickOutside = <T extends HTMLElement>(
  ref: React.RefObject<T>,
  openBtnClassName: string
) => {
  const [isOpen, setIsOpen] = useState(false);

  useEventListener<Document, MouseEvent>(document, 'click', (e: MouseEvent) => {
    if (!ref.current || !openBtnClassName) return;
    const element = e.target as HTMLElement;
    const refElement = ref.current;

    setIsOpen(
      !(!element.classList.contains(openBtnClassName) && element !== refElement)
    );
  });

  return { isOpen, setIsOpen };
};

const useDarkMode = (className: string) => {
  const [isDark, setIsDark] = useState<boolean>(() => {
    const savedValue = localStorage.getItem(className);
    if (savedValue) return JSON.parse(savedValue);
    return false;
  });

  const isMatch = useMediaQuery('(prefers-color-scheme: dark)');
  const enable = isDark ?? isMatch;

  useLayoutEffect(() => {
    localStorage.setItem(className, JSON.stringify(enable));
    document.body.classList.toggle(className, enable);
  }, [enable, className]);

  return { isDark, setIsDark };
};

const useCopyToClipBorad = () => {
  const [status, setStatus] = useState(false);

  const copyText = useCallback((value: string) => {
    try {
      const result = copy(value);
      setStatus(result);
      const timeoutId = setTimeout(() => {
        setStatus(false);
        clearTimeout(timeoutId);
      }, 2000);
    } catch (e: any) {
      setStatus(false);
    }
  }, []);

  return { copyText, status };
};

const useCookie = (key: string, initialCookie: string) => {
  const [state, setState] = useState(() => {
    const savedCookie = Cookies.get(key);
    if (savedCookie) {
      return savedCookie;
    }
    return initialCookie;
  });

  const changeCookie = useCallback(
    (newCookie: string) => {
      setState(newCookie);
      Cookies.set(key, newCookie, { expires: 7, path: '/' });
    },
    [key]
  );

  const removeCookie = () => {
    Cookies.remove(key);
    setState('');
  };

  useEffect(() => {
    const savedCookie = Cookies.get(key);
    if (!savedCookie) {
      Cookies.set(key, initialCookie, { expires: 7, path: '/' });
    }
  }, []);

  return { state, setState, changeCookie, removeCookie };
};

// useEventListener<Window, Event>(window, 'online', (e: Event) => {
//   console.log(navigator.onLine);
// });
// useEventListener<Window, Event>(window, 'offline', (e: Event) => {
//   console.log(navigator.onLine);
// });

const useOnlineStatus = () => {
  const [onlineStatus, setOnlineStatus] = useState(navigator.onLine);

  useEventListener<Window, Event>(window, 'online', (e: Event) =>
    setOnlineStatus(navigator.onLine)
  );
  useEventListener<Window, Event>(window, 'offline', (e: Event) =>
    setOnlineStatus(navigator.onLine)
  );

  return onlineStatus;
};

const useRenderCount = () => {
  const renderCountRef = useRef<number>(1);

  useEffect(() => {
    renderCountRef.current += 1;
  });

  return renderCountRef.current;
};

type TBoolean = {
  previous: boolean;
  current: boolean;
};
type TCount = {
  previous: number;
  current: number;
};
type ChangedProps = {
  changedProps: {
    [key: string]: TBoolean | TCount | {};
  };
};

const useDebugInfo = <T extends TProps>(props: T, componentName: string) => {
  const changedPropsRef = useRef<ChangedProps>({ changedProps: {} });
  const prevPropsRef = useRef(props);
  const renderCount = useRenderCount();
  const lastRenderTimestamp = useRef(Date.now());

  const getChangedPropsKeys = (prev: T, curr: T) => {
    return Object.keys(curr).reduce((obj, key) => {
      if (prev[key as keyof T] === curr[key as keyof T]) return obj;
      return [...obj, key as string];
    }, [] as string[]);
  };

  const changedPropsKeys = getChangedPropsKeys(prevPropsRef.current, props);

  if (changedPropsKeys.length) {
    changedPropsKeys.forEach((key) => {
      changedPropsRef.current.changedProps[key] = {
        ...changedPropsRef.current.changedProps,
        previous: prevPropsRef.current[key as keyof T],
        current: props[key as keyof T],
      };
    });
  }

  const info = {
    renderCount,
    ...changedPropsRef.current,
    timeSinceLastRender: Date.now() - lastRenderTimestamp.current,
    lastRenderTimestamp: lastRenderTimestamp.current,
  };

  useEffect(() => {
    console.log(`[debug-info]-${componentName}-\t${JSON.stringify(info)}`);
    lastRenderTimestamp.current = Date.now();
    prevPropsRef.current = props;
    return () => {
      changedPropsRef.current = { changedProps: {} };
    };
  });

  return info;
};

const useHover = <T extends HTMLElement>(ref: React.RefObject<T>) => {
  const [isHoverOn, setIsHoverOn] = useState(false);

  useEventListener<T, MouseEvent>(ref, 'mouseenter', () => setIsHoverOn(true));
  useEventListener<T, MouseEvent>(ref, 'mouseout', () => setIsHoverOn(false));

  return isHoverOn;
};

const usePractice = <T extends HTMLElement>(
  ref: React.RefObject<T>,
  cb: () => void,
  delay: number = 1500
) => {
  const { removeTimeOut, resetTimeout } = useTimeout(cb, delay);

  useEventListener<T, MouseEvent>(ref, 'mousedown', (e: MouseEvent) =>
    resetTimeout()
  );
  useEventListener<T, MouseEvent>(ref, 'touchstart', (e: MouseEvent) =>
    resetTimeout()
  );

  useEventListener<T, MouseEvent>(ref, 'mouseup', (e: MouseEvent) =>
    removeTimeOut()
  );
  useEventListener<T, MouseEvent>(ref, 'mouseleave', (e: MouseEvent) =>
    removeTimeOut()
  );
  useEventListener<T, MouseEvent>(ref, 'touchend', (e: MouseEvent) =>
    removeTimeOut()
  );

  useEffect(() => removeTimeOut(), []);
};
export default usePractice;
