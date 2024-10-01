import useStateWithValidation from '../hooks/useStateWithValidation';

const StateWithValidationComponent = () => {
  const { username, setUsername, isValid } = useStateWithValidation(
    (value) => !!(value.length > 5 && !/\d/.test(value)),
    ''
  );
  return (
    <div className="state-with-validation">
      <p className="is-valid">IsValid : {isValid.toString()}</p>
      <input
        type="text"
        id="userName"
        title="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
    </div>
  );
};

export default StateWithValidationComponent;
