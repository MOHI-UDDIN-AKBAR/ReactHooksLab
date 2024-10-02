import useArray from '../hooks/useArray';

const ArrayComponent = () => {
  const {
    array,
    push,
    updateArray,
    removeElement,
    filterArray,
    recreateArray,
    clearArray,
  } = useArray([1, 2, 3, 4, 5, 5, 6, 7, 8]);

  return (
    <div className="array-container">
      <p className="current-value">{array?.join(' ').toString()}</p>
      <div className="array-action-buttons">
        <button
          type="button"
          className="add-element__btn"
          onClick={() => push(7)}
        >
          Add 7
        </button>
        <button
          type="button"
          className="update-element__btn"
          onClick={() => updateArray(1, 9)}
        >
          Change Second Element With 9
        </button>
        <button
          type="button"
          className="remove-element__btn"
          onClick={() => removeElement(1)}
        >
          Remove Second Element
        </button>
        <button
          type="button"
          className="filter-array__btn"
          onClick={() => filterArray(4)}
        >
          keep element less than 4
        </button>
        <button
          type="button"
          className="recreate-array__btn"
          onClick={() => recreateArray([1, 2])}
        >
          Set To 1,2
        </button>
        <button type="button" className="clear-array__btn" onClick={clearArray}>
          Clear
        </button>
      </div>
    </div>
  );
};

export default ArrayComponent;
