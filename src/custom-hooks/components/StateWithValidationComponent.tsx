import { FormEvent, useMemo } from 'react';
import useStateWithValidation from '../hooks/useStateWithValidation';

const initialPerson = {
  username: '',
  email: '',
  password: '',
};

const initialIsValid = {
  username: false,
  email: false,
  password: false,
};

export type Person = typeof initialPerson;
export type IsValid = typeof initialIsValid;

const StateWithValidationComponent = () => {
  const validate = useMemo(
    () => (value: string) =>
      !!(value.length > 7 && !new RegExp(/\d/).test(value)),
    []
  );
  const {
    state: person,
    setState: setPerson,
    isValid,
    handleChange,
  } = useStateWithValidation(validate, initialPerson, initialIsValid);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Person : ', person);
    setPerson(initialPerson);
  };

  const getInputStyle = (isValidField: boolean) => ({
    outline: isValidField ? '2px solid green' : '2px solid red',
  });

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="username">UserName : </label>
        <input
          type="text"
          id="username"
          title="username"
          className="form-controls"
          value={person.username}
          style={getInputStyle(isValid.username)}
          onChange={(e) => handleChange(e.target.value, 'username')}
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email : </label>
        <input
          type="text"
          id="email"
          title="email"
          className="form-controls"
          value={person.email}
          style={getInputStyle(isValid.email)}
          onChange={(e) => handleChange(e.target.value, 'email')}
        />
      </div>
      <div className="form-group">
        <label htmlFor="username">Password : </label>
        <input
          type="text"
          id="password"
          title="password"
          className="form-controls"
          value={person.password}
          style={getInputStyle(isValid.password)}
          onChange={(e) => handleChange(e.target.value, 'password')}
        />
      </div>
      <button type="submit" className="submit-btn">
        Submit
      </button>
    </form>
  );
};

export default StateWithValidationComponent;
