import { usePostsContext } from './UseContextPractice';

const NormalComponent = () => {
  const { posts, isLoading, error } = usePostsContext();

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error-message"> Error: {error}</div>;
  }

  return (
    <div className="posts-wrapper">
      {posts.map(({ title, body, id }) => (
        <div
          className="post-card"
          key={id}
          style={{ padding: '2rem', border: '2px solid grey', margin: '2rem' }}
        >
          <h4 className="post-card__title">{title}</h4>
          <p className="post-card__body">{body}</p>
        </div>
      ))}
    </div>
  );
};

export default NormalComponent;
