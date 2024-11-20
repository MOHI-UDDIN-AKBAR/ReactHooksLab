import useToggle from '../hooks/useToggle';

const ToggleComponent = () => {
  const { isToggled, toggle, enable, disable } = useToggle(false);

  return (
    <div className="toggle-container">
      <p className="toggle-value">{isToggled ? 'On' : 'Off'}</p>
      <div className="buttons">
        <button type="button" className="toggle-btn" onClick={toggle}>
          Toggle
        </button>
        <button
          type="button"
          className="enable-btn"
          onClick={() => enable(true)}
        >
          Enable
        </button>{' '}
        <button
          type="button"
          className="disable-btn"
          onClick={() => disable(false)}
        >
          Disable
        </button>
      </div>
    </div>
  );
};

export default ToggleComponent;
