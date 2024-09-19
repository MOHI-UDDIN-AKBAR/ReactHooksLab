import { useCallback, useDeferredValue, useEffect, useState } from "react";

const POST_API_URL = "https://jsonplaceholder.typicode.com/posts";

type Post = {
  id: number;
  title: string;
  body: string;
};

type PostsProps = {
  posts: Post[];
  isLoading: boolean;
  errorMessage: string;
  searchQuery: string;
};

const Posts = ({ posts, isLoading, errorMessage, searchQuery }: PostsProps) => {
  const deferredQuery = useDeferredValue(searchQuery);

  const filteredPosts = posts.filter(({ title }) =>
    title.includes(deferredQuery)
  );

  for (let i = 0; i < 100000000; i++) {}

  const displayPosts = filteredPosts.length ? filteredPosts : posts;

  return (
    <div className="posts">
      <div className="post-status">
        {isLoading && <p className="loader">Loading...</p>}
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>
      {displayPosts.map(({ title, id, body }) => (
        <div
          className="post-card"
          key={id}
          style={{
            border: "2px solid #6262b5",
            margin: "2rem",
            padding: "1rem",
          }}
        >
          <h4 className="post-title">{title}</h4>
          <p className="post-body">{body}</p>
        </div>
      ))}
    </div>
  );
};

const JustPracticeFour = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      setErrorMessage("");
      try {
        const res = await fetch(POST_API_URL);
        if (!res.ok) throw new Error("Failed to fetch Post data.");
        setPosts((await res.json()).slice(0, 20));
      } catch (e: any) {
        setErrorMessage(e.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="post-container">
      <div className="post-search-controls">
        <label htmlFor="search-post-input">Search Posts : </label>
        <input
          type="text"
          id="search-post-input"
          title="search-post-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <Posts
        posts={posts}
        isLoading={isLoading}
        errorMessage={errorMessage}
        searchQuery={searchQuery}
      />
    </div>
  );
};

export default JustPracticeFour;
