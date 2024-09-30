import { useCallback, useEffect, useState } from 'react';

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

type UserType = {
  id: number;
  name: number;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
  };
};

type ResourceName = 'posts' | 'comments' | 'users';
type ResourceDataType = PostType[] | CommentType[] | UserType[];

const capitalizeFirstLetter = (str: string): string =>
  str.charAt(0)?.toUpperCase() + str.slice(1);

const UseEffectPractice = () => {
  const [resourceName, setResourceName] = useState<ResourceName>('posts');
  const [resourceData, setResourceData] = useState<ResourceDataType>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleResourceChange = useCallback(
    (newResourceName: ResourceName): void => {
      setResourceName(newResourceName);
    },
    []
  );

  useEffect(() => {
    const tryFetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const res = await fetch(
          `https://jsonplaceholder.typicode.com/${resourceName}`
        );
        if (!res.ok) {
          throw new Error('Not Found!');
        }
        const data = await res.json();
        setResourceData(data.slice(0, 10));
      } catch (err: any) {
        console.error(err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    tryFetchData();
  }, [resourceName]);

  return (
    <div className="resource-type">
      <div className="btn-group">
        {(['posts', 'comments', 'users'] as ResourceName[]).map((type) => (
          <button
            key={type}
            type="button"
            className="btn"
            onClick={() => handleResourceChange(type)}
          >
            {capitalizeFirstLetter(type)}
          </button>
        ))}
      </div>

      <div className="resource-data">
        {isLoading && <p className="loading">Loading...</p>}
        {!isLoading &&
          !error &&
          resourceData?.map((eachResource: any, index: number) => (
            <div key={index}>{JSON.stringify(eachResource)}</div>
          ))}
      </div>
    </div>
  );
};

export default UseEffectPractice;
