import { useEffect, useRef } from 'react';
import { isEqual } from 'lodash';

const useDeepCompareEffect = <T>(callback: () => void, dependencies: T[]) => {
  const previousDependenciesRef = useRef<T[]>([]);

  if (!isEqual(dependencies, previousDependenciesRef.current)) {
    previousDependenciesRef.current = dependencies;
  }

  useEffect(() => {
    callback();
  }, [previousDependenciesRef.current]);
};

export default useDeepCompareEffect;
