import { useEffect, useState } from "react";

const API_URL = "https://jsonplaceholder.typicode.com/posts";

type PostType = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

const JustPracticeThree = () => {
  const [searchInput, setSearchInput] = useState("");
  const [posts, setPosts] = useState<PostType[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const formatTitle = (title: string): string => {
    return title.length > 30
      ? `${title.charAt(0).toUpperCase()}${title.substring(1, 30)}...`
      : `${title.charAt(0).toUpperCase()}${title.substring(1)}`;
  };

  const handleChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchInput(value);
  };

  useEffect(() => {
    const fetchPostData = async () => {
      setIsLoading(true);
      setError("");
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          const errorMsg = `Error: ${response.status}`;
          throw new Error(errorMsg);
        }
        const data = await response.json();
        setPosts(data.slice(0, 20));
      } catch (e: any) {
        if (e.message === "Failed to fetch") {
          setError("Failed to fetch Post Data");
        } else {
          setError(e.message);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchPostData();
  }, []);

  const postData = searchInput
    ? posts?.filter(({ title }) =>
        title.toLowerCase().includes(searchInput.toLowerCase())
      )
    : posts;

  return (
    <article className="post-data">
      <div className="search-input">
        <label htmlFor="search">Search Post : </label>
        <input
          type="text"
          id="search"
          title="search-input"
          value={searchInput}
          onChange={handleChanges}
        />
      </div>
      <div className="status">
        <div className="loading-message">
          {isLoading && (
            <h1
              style={{
                color: "blue",
                padding: "1rem",
                margin: "3rem",
                border: "2px solid green",
              }}
            >
              Loading....
            </h1>
          )}
        </div>
        <div className="error-message">
          {error && (
            <h1
              style={{
                color: "blue",
                padding: "1rem",
                margin: "3rem",
                border: "2px solid green",
              }}
            >
              {error}
            </h1>
          )}
        </div>
      </div>
      <div className="post-content">
        {postData &&
          postData.map(({ id, title, body }) => (
            <div
              key={id}
              className="post-card"
              style={{
                border: "2px solid blue",
                margin: "2rem",
                padding: "1rem",
              }}
            >
              <h1 className="post-title">{formatTitle(title)}</h1>
              <p className="post-body">{body}</p>
            </div>
          ))}
      </div>
    </article>
  );
};

export default JustPracticeThree;
