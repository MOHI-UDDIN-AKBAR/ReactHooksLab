import { useEffect, useRef } from 'react';
import useRenderCount from './useRenderCount';

type TProps = {
  count: number;
  boolean: boolean;
};

type ChangedProps<T = TProps> = {
  changedProps: Partial<
    { [K in keyof T]: { previous: T[K]; current: T[K] } } | {}
  >;
};

const useDebugInfo = (props: TProps, componentName: string) => {
  const renderCount = useRenderCount();
  const prevRef = useRef(props);
  const changedPropsRef = useRef<ChangedProps>({ changedProps: {} });
  const lastRenderTimeStartRef = useRef(Date.now());

  const getChangedPropsKey = (prev: TProps, curr: TProps) => {
    return Object.keys(curr).reduce((obj: string[], key: string) => {
      if (prev[key as keyof TProps] === curr[key as keyof TProps]) return obj;
      return [...obj, key];
    }, []);
  };

  const changedPropsKey = getChangedPropsKey(prevRef.current, props);
  if (changedPropsKey.length > 0) {
    changedPropsKey.forEach((key) => {
      changedPropsRef.current = {
        ...changedPropsRef.current,
        changedProps: {
          [key]: {
            previous: prevRef.current[key as keyof TProps],
            current: props[key as keyof TProps],
          },
        },
      };
    });
  }

  const info = {
    render: renderCount,
    ...changedPropsRef.current,
    timeSinceLastRender: Date.now() - lastRenderTimeStartRef.current,
    lastRenderTimeStartRef: lastRenderTimeStartRef.current,
  };

  useEffect(() => {
    prevRef.current = props;
    lastRenderTimeStartRef.current = Date.now();
    console.log(`[debug--info]-${componentName}\t${JSON.stringify(info)}`);
  });

  return info;
};

export default useDebugInfo;
