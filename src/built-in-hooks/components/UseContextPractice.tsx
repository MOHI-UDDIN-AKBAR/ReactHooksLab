import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const POSTS_API_URL = "https://jsonplaceholder.typicode.com/posts";

type PostType = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

type PostContextType = {
  posts: PostType[];
  isLoading: boolean;
  error: string | null;
};

const PostsContext = createContext<PostContextType | undefined>(undefined);

const UseContextPractice = ({ children }: { children: ReactNode }) => {
  const [posts, setPost] = useState<PostType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(POSTS_API_URL);
        if (!res.ok) throw new Error("Failed to fetch posts");
        const postData = await res.json();
        setPost(postData.slice(0, 10));
        setError(null);
      } catch (err: any) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
      } finally {
        setIsLoading(false);
      }
    };
    fetchPosts();
  }, []);

  return (
    <PostsContext.Provider value={{ posts, isLoading, error }}>
      {children}
    </PostsContext.Provider>
  );
};

export const usePostsContext = () => {
  const context = useContext(PostsContext);

  if (!context) {
    throw new Error(
      "usePostsContext must be used within a UseContextPractice provider"
    );
  }
  return context;
};

export default UseContextPractice;
