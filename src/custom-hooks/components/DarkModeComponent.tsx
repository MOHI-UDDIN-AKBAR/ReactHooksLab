import useDarkMode from '../hooks/useDarkMode';

const DarkModeComponent = () => {
  const { darkMode, setDarkMode } = useDarkMode();

  return (
    <div className="dark-mode-container">
      <p className="current-mode">
        Current Mode : {darkMode ? 'Dark' : 'Light'}
      </p>
      <button
        type="button"
        className="toggle-dark-mode"
        onClick={() => setDarkMode((prev) => !prev)}
      >
        Toggle Dark Mode
      </button>
    </div>
  );
};

export default DarkModeComponent;
