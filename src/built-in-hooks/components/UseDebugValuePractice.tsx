import { useDebugValue, useEffect, useState } from 'react';

const useLocalStorage = (key: string, initialValue: string) => {
  const [firstName, setFirstName] = useState<string>(
    () => localStorage.getItem('firstName') ?? initialValue
  );

  useDebugValue(firstName, (name) => getNameSlowly(name));

  useEffect(() => {
    localStorage.setItem(key, firstName);
  }, [firstName, key]);

  return { firstName, setFirstName };
};

const UseDebugValuePractice = () => {
  const { firstName, setFirstName } = useLocalStorage('firstName', 'arafat');

  const [lastName, setLastName] = useState('');

  return (
    <div className="container">
      <div>
        <label htmlFor="firstName">
          FirstName:{' '}
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            title="firstName"
            id="firstName"
          />
        </label>
      </div>
      <div>
        <label htmlFor="lastName">
          LastName:{' '}
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            title="lastName"
            id="lastName"
          />
        </label>
      </div>
    </div>
  );
};

export default UseDebugValuePractice;

function getNameSlowly(name: string) {
  for (let i = 0; i < 10000000000; i++) {}
  return name;
}
