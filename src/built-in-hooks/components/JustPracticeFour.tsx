import { useCallback, useEffect, useState, useTransition } from "react";

const POST_API_URL = "https://jsonplaceholder.typicode.com/posts";

type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

const JustPracticeFour = () => {
  const [isPending, startTransition] = useTransition();
  const [posts, setPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const filterPostsBySearch = (searchValue: string) => {
    setFilteredPosts(() => {
      return posts.filter(({ title }) => title.includes(searchValue));
    });
  };

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchQuery(value);

    const timeOutId = setTimeout(() => {
      startTransition(() => {
        filterPostsBySearch(value);
      });
    }, 300);

    return () => clearTimeout(timeOutId);
  };

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

  const displayPosts = filteredPosts.length ? filteredPosts : posts;

  return (
    <div className="post-container">
      <div className="post-search-controls">
        <label htmlFor="search-post-input">Search Posts : </label>
        <input
          type="text"
          id="search-post-input"
          title="search-post-input"
          value={searchQuery}
          onChange={handleSearchInputChange}
        />
      </div>
      <div className="posts">
        <div className="post-status">
          {(isPending || isLoading) && <p className="loader">Loading...</p>}
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
    </div>
  );
};

export default JustPracticeFour;
