import { useLocalStorage, useSessionStorage } from '../hooks/useStorage';

const StorageComponent = () => {
  const [username, setUsername, removeName] = useLocalStorage(
    'username',
    'Rifat'
  );
  const [userAge, setUserAge, removeAge] = useSessionStorage(
    'userAge',
    (22).toString()
  );

  return (
    <div className="storage-container">
      <div className="values">
        <p className="name">Name : {username}</p>
        <p className="age">Age: {userAge}</p>
      </div>
      <div className="action-buttons">
        <button
          type="button"
          className="set-name__btn"
          onClick={() => setUsername('samir')}
        >
          Set Name
        </button>
        <button
          type="button"
          className="set-age__btn"
          onClick={() => setUserAge((27).toString())}
        >
          Set Age
        </button>
        <button type="button" className="remove-name__btn" onClick={removeName}>
          Remove Name
        </button>
        <button type="button" className="remove-age__btn" onClick={removeAge}>
          Remove Age
        </button>
      </div>
    </div>
  );
};

export default StorageComponent;
