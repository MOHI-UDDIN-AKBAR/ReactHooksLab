import { useState } from 'react';

const useArray = (initialArray: number[]) => {
  const [array, setArray] = useState(initialArray);

  const push = (value: number) =>
    setArray((prevArray) => [...prevArray, value]);

  const updateArray = (position: number, value: number) =>
    setArray((prevArray) =>
      prevArray.map((element: number, i: number) => {
        if (i === position) return value;
        return element;
      })
    );

  const removeElement = (position: number) =>
    setArray((prevArray) =>
      prevArray.filter((_: number, i: number) => i !== position)
    );

  const filterArray = (value: number) =>
    setArray((prevArray) =>
      prevArray.filter((element: number) => element < value)
    );

  const recreateArray = (newArray: number[]) => setArray(newArray);

  const clearArray = () => setArray([]);

  return {
    array,
    push,
    updateArray,
    removeElement,
    filterArray,
    recreateArray,
    clearArray,
  };
};

export default useArray;
