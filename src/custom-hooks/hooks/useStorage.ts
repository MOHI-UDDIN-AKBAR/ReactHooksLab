import { useCallback, useEffect, useState } from 'react';

type StorageReturnType = [string, (value: string) => void, () => void];

const useLocalStorage = (
  key: string,
  defaultValue: string
): StorageReturnType => {
  return useStorage(key, defaultValue, localStorage);
};

const useSessionStorage = (
  key: string,
  defaultValue: string
): StorageReturnType => {
  return useStorage(key, defaultValue, sessionStorage);
};

const useStorage = (
  key: string,
  initialValue: string,
  storage: Storage
): StorageReturnType => {
  const [storageValue, setStorageValue] = useState<string>(() => {
    const savedValue = storage.getItem(key);
    return savedValue ? savedValue : initialValue;
  });

  const removeItem = useCallback(() => {
    storage.removeItem(key);
    setStorageValue('');
  }, [storage, key]);

  useEffect(() => {
    storage.setItem(key, storageValue);
  }, [key, storage, storageValue]);

  return [storageValue, setStorageValue, removeItem];
};

export { useStorage, useLocalStorage, useSessionStorage };
