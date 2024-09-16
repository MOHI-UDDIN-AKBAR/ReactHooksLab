import { useEffect, useState } from "react";

const API_URL = "https://jsonplaceholder.typicode.com/";

type PostType = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

type CommentType = {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
};

type PhotoType = {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
};

type ResourceType = "posts" | "comments" | "photos";
type ResourceDataType =
  | { type: "posts"; data: PostType[] }
  | { type: "comments"; data: CommentType[] }
  | { type: "photos"; data: PhotoType[] };

type ResourceRendererType = {
  resourceData: ResourceDataType;
};

const Posts = ({ posts }: { posts: PostType[] }) => {
  return (
    <article className="posts">
      {posts.map(({ id, title, body }: PostType) => (
        <div
          className="post"
          key={id}
          style={{
            border: "2px solid green",
            padding: "1rem",
            margin: "1rem",
          }}
        >
          <h4 className="post-title">{title}</h4>
          <p className="post-body">{body}</p>
        </div>
      ))}
    </article>
  );
};

const Comments = ({ comments }: { comments: CommentType[] }) => {
  return (
    <article className="comments">
      {comments.map(({ id, name, body }: CommentType) => (
        <div
          className="comment"
          key={id}
          style={{
            border: "2px solid green",
            padding: "1rem",
            margin: "1rem",
          }}
        >
          <h4 className="comment-name">{name}</h4>
          <p className="comment-body">{body}</p>
        </div>
      ))}
    </article>
  );
};

const Photos = ({ photos }: { photos: PhotoType[] }) => {
  return (
    <article className="posts">
      {photos.map(({ id, title, url, thumbnailUrl }: PhotoType) => (
        <div
          className="photo"
          key={id}
          style={{
            border: "2px solid green",
            padding: "1rem",
            margin: "1rem",
          }}
        >
          <h4 className="photo-title">{title}</h4>
          <img src={thumbnailUrl} alt={title} width={200} height={200} />
        </div>
      ))}
    </article>
  );
};

const ResourceRenderer = ({ resourceData }: ResourceRendererType) => {
  switch (resourceData.type) {
    case "posts": {
      return <Posts posts={resourceData.data} />;
    }
    case "comments": {
      return <Comments comments={resourceData.data} />;
    }
    case "photos": {
      return <Photos photos={resourceData.data} />;
    }
  }
};

const Loader = () => {
  return (
    <div
      className="loader"
      style={{
        border: "3px solid blue",
        padding: "1rem",
        fontSize: "2rem",
        margin: "3rem",
      }}
    >
      <h1 className="loader-data">Loading...</h1>
    </div>
  );
};
const JustPracticeTwo = () => {
  const [resourceData, setResourceData] = useState<
    ResourceDataType | undefined
  >(undefined);
  const [resourceType, setResourceType] = useState<ResourceType>("posts");
  const [value, setValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (value === "posts" || value === "comments" || value === "photos") {
      setResourceType(value);
    }
    setValue("");
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError("");
      try {
        const res = await fetch(`${API_URL}${resourceType}`);
        if (!res.ok) {
          throw new Error(`Failed to fetch ${resourceType} data`);
        }
        const resData = await res.json();
        setResourceData({ type: resourceType, data: resData.slice(0, 10) });
      } catch (e: any) {
        if (e.message === "Failed to fetch") {
          setError(`Network error: Failed to fetch ${resourceType} data`);
        } else {
          setError(e.message);
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [resourceType]);

  return (
    <div className="container">
      <form className="form" onSubmit={handleForm}>
        <div className="form-group">
          <label htmlFor="resource">Resource:</label>
          <input
            type="text"
            className="resource-input"
            title="resource"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      <div className="status">
        {isLoading && <Loader />}
        {error && (
          <p style={{ color: "red", padding: ".5rem", margin: "1rem" }}>
            {error}
          </p>
        )}
      </div>
      <div className="display-resource">
        {resourceData && <ResourceRenderer resourceData={resourceData} />}
      </div>
    </div>
  );
};

export default JustPracticeTwo;
