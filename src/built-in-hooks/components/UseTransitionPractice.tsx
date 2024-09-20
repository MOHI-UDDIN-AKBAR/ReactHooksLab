import React, { useEffect, useState, useTransition } from "react";

type CommentType = {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
};

const COMMENTS_API_URL = "https://jsonplaceholder.typicode.com/comments";

const UseTransitionPractice = () => {
  const [input, setInput] = useState<string>("");
  const [comments, setComments] = useState<CommentType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [filterComments, setFilterComments] = useState<CommentType[]>([]);
  const [isPending, startTransition] = useTransition();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);

    startTransition(() => {
      setFilterComments(() => {
        return comments.filter(({ name }) =>
          name.toLowerCase().includes(e.target.value.toLowerCase())
        );
      });
    });
  };

  // version -2
  //   useEffect(() => {
  //     startTransition(() => {
  //       setFilterComments(() => {
  //         return comments.filter(({ name }) =>
  //           name.toLowerCase().includes(input.toLowerCase())
  //         );
  //       });
  //     });
  //   }, [input, comments]);

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
      {isPending ? (
        <div className="loading">Loading...</div>
      ) : (
        filterComments?.map(({ name, body, id }) => (
          <div
            key={id}
            className="comment"
            style={{ padding: "2rem", margin: "2rem" }}
          >
            <h3 className="title">{name}</h3>
            <p className="body">{body}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default UseTransitionPractice;
