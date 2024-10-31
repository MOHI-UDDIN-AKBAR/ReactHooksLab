import { useState } from 'react';
import useFetch from '../hooks/useFetch';

const API_URL = 'https://jsonplaceholder.typicode.com/posts';

const FetchComponent = () => {
  const [id, setId] = useState(1);
  const { isLoading, error, value: post } = useFetch(API_URL, 'GET', id);
  return (
    <div className="fetch-container">
      <p className="post-id">{id}</p>
      <button
        type="button"
        className="increment-btn"
        onClick={() => setId((prevId) => prevId + 1)}
      >
        Increment
      </button>

      <div className="status">
        {isLoading && <p className="loader">Loading...</p>}
        {error && <p className="loader">{error}</p>}
      </div>

      {post && (
        <div
          className="post"
          style={{ margin: '1rem', padding: '.5rem', border: '2px solid' }}
        >
          <p className="user-id">userId : {post.userId} </p>
          <p className="id">Id : {post.id}</p>
          <p className="title">Title : {post.title} </p>
          <p className="body">body : {post.body} </p>{' '}
        </div>
      )}
    </div>
  );
};

export default FetchComponent;
