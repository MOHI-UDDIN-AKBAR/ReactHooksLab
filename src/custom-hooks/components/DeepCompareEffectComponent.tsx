import { useEffect, useRef, useState } from 'react';
import { isEqual } from 'lodash';
import useDeepCompareEffect from '../hooks/useDeepCompareEffect';

export type Person = { age: number; name: string };
const DeepCompareEffectComponent = () => {
  const [age, setAge] = useState(1);

  const [otherCount, setOtherCount] = useState(0);
  const useEffectRenderCountRef = useRef<HTMLSpanElement | null>(null);
  const useDeepCompareEffectRenderCountRef = useRef<HTMLSpanElement | null>(
    null
  );
  const prevStateRef = useRef<Person | null>(null);

  const person = { age: age, name: 'rifat' };

  useEffect(() => {
    if (
      !useEffectRenderCountRef.current ||
      useEffectRenderCountRef.current?.textContent === null
    )
      return;

    useEffectRenderCountRef.current.textContent = (
      parseInt(useEffectRenderCountRef.current?.textContent) + 1
    ).toString();
  }, [person]);

  //   version One with UseEffect
  //   useEffect(() => {
  //     if (
  //       !useDeepCompareEffectRenderCountRef.current ||
  //       useDeepCompareEffectRenderCountRef.current?.textContent === null
  //     )
  //       return;

  //     if (!isEqual(person, prevStateRef.current)) {
  //       prevStateRef.current = person;
  //       useDeepCompareEffectRenderCountRef.current.textContent = (
  //         parseInt(useDeepCompareEffectRenderCountRef.current?.textContent) + 1
  //       ).toString();
  //     }
  //   }, [person]);

  //version two with custom hook
  useDeepCompareEffect<Person>(() => {
    if (
      !useDeepCompareEffectRenderCountRef.current ||
      useDeepCompareEffectRenderCountRef.current?.textContent === null
    )
      return;

    useDeepCompareEffectRenderCountRef.current.textContent = (
      parseInt(useDeepCompareEffectRenderCountRef.current?.textContent) + 1
    ).toString();
  }, [person]);
  console.log('coming');
  return (
    <div className="deep-compare-effect-container">
      <div className="values">
        <p className="use-effect">
          useEffect : <span ref={useEffectRenderCountRef}>0</span>
        </p>
        <p className="use-deep-compare-effect">
          useDeepCompareEffect :{' '}
          <span ref={useDeepCompareEffectRenderCountRef}>0</span>
        </p>
        <p className="other-count">OtherCount : {otherCount}</p>
        <p className="age-and-name"> Age && Name : {JSON.stringify(person)}</p>
      </div>
      <div className="buttons">
        <button
          type="button"
          className="increment-age__btn"
          onClick={() => setAge((prevAge) => prevAge + 1)}
        >
          Increment Age
        </button>
        <button
          type="button"
          className="increment-other-count__btn"
          onClick={() => setOtherCount((prevCount) => prevCount + 1)}
        >
          Increment Other Count
        </button>
      </div>
    </div>
  );
};

export default DeepCompareEffectComponent;
