import React, { memo, useCallback, useEffect, useMemo, useState } from "react";

type PostType = {
  body: string;
  id: number;
  title: string;
  userId: number;
};

type PostPropsType = {
  fetchPostData: () => void;
  posts: PostType[];
};

const API_URL = "https://jsonplaceholder.typicode.com/posts";

const Post = memo(({ fetchPostData, posts }: PostPropsType) => {
  useEffect(() => {
    fetchPostData();
  }, [fetchPostData]);

  return (
    <div className="posts-wrapper">
      {posts?.map(({ id, body, title }: PostType) => (
        <div
          key={id}
          className="post"
          style={{ border: "2px solid green", padding: "1rem", margin: "1rem" }}
        >
          <h3 className="post-title">{title}</h3>
          <p className="post-body">{body}</p>
        </div>
      ))}
    </div>
  );
});

const UseCallbackPractice = () => {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [count, setCount] = useState<number>(0);

  const handleCounter = (type: string) => {
    if (type === "add") {
      setCount((prev) => prev + 1);
    } else if (type === "subtract") {
      setCount((prev) => prev - 1);
    }
  };

  const fetchPostData = useCallback(async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error("Post Not Found!");
      const postsData = await response.json();
      setPosts(postsData.slice(0, 10));
    } catch (e: any) {
      console.error(e.message);
    }
  }, []);

  const memoizedPosts = useMemo(() => posts, [posts]);

  return (
    <div className="container">
      <div className="counter">
        <button
          type="button"
          className="counter-btn"
          onClick={() => handleCounter("subtract")}
        >
          Decrement
        </button>
        <strong>{count}</strong>
        <button
          type="button"
          className="counter-btn"
          onClick={() => handleCounter("add")}
        >
          Increment
        </button>
      </div>
      <Post posts={memoizedPosts} fetchPostData={fetchPostData} />
    </div>
  );
};

export default UseCallbackPractice;
