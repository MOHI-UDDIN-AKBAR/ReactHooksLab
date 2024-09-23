import React, {
  useDeferredValue,
  useEffect,
  useMemo,
  useState,
  useTransition,
} from "react";

type CommentType = {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
};

const COMMENTS_API_URL = "https://jsonplaceholder.typicode.com/comments";

const List = ({
  input,
  comments,
}: {
  input: string;
  comments: CommentType[];
}) => {
  const deferredInput = useDeferredValue(input);

  const filterComments = useMemo(() => {
    return comments.filter(({ name }) => name.includes(deferredInput));
  }, [deferredInput, comments]);

  console.log(`input: ${input}\tDeferredValue: ${deferredInput}`);

  return (
    <>
      {filterComments?.map(({ name, body, id }) => (
        <div
          key={id}
          className="comment"
          style={{ padding: "2rem", margin: "2rem" }}
        >
          <h3 className="title">{name}</h3>
          <p className="body">{body}</p>
        </div>
      ))}
    </>
  );
};

const UseDeferredValuePractice = () => {
  const [input, setInput] = useState<string>("");
  const [comments, setComments] = useState<CommentType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [filterComments, setFilterComments] = useState<CommentType[]>([]);
  const [isPending, startTransition] = useTransition();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  useEffect(() => {
    const fetchComments = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(COMMENTS_API_URL);
        if (!response.ok) throw new Error("Failed to fetch comments");
        setComments(await response.json());
      } catch (e: any) {
        console.error(e.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchComments();
  }, []);

  return (
    <div>
      <div className="input">
        <input
          type="text"
          title="input"
          className="input"
          value={input}
          onChange={handleChange}
        />
      </div>
      <List input={input} comments={comments} />
    </div>
  );
};

export default UseDeferredValuePractice;
