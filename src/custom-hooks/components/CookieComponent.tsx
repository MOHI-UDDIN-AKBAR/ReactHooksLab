import useCookie from '../hooks/useCookie';

const CookieComponent = () => {
  const { value, updateCookie, removeCookie } = useCookie('name', 'Rifat');
  return (
    <div className="cookie-container">
      {value && <p className="name">{value}</p>}
      <button
        type="button"
        className="change-name-btn"
        onClick={() => updateCookie('Samir', { expires: 2, path: '/' })}
      >
        Change Name to Rifat
      </button>
      <button type="button" className="remove-name-btn" onClick={removeCookie}>
        Remove Name
      </button>
    </div>
  );
};

export default CookieComponent;
