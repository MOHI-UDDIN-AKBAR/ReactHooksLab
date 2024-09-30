import React, { useState } from 'react';

type User = {
  username: string;
  email: string;
  password: string;
};

type UserCardProps = { user: User };

const initialUserState: User = {
  username: '',
  email: '',
  password: '',
};

const UserCard = ({ user: { username, email, password } }: UserCardProps) => {
  return (
    <div className="user-card">
      <h3 className="user-card__name">{username}</h3>
      <h3 className="user-card__email">{email}</h3>
      <h3 className="user-card__pwd">{password}</h3>
    </div>
  );
};

const UseStatePractice = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [formData, setFormData] = useState<User>(initialUserState);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [id]: value }));
  };

  const isFormDataValid = ({ username, email, password }: User): boolean =>
    Boolean(username && email && password);

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isFormDataValid(formData)) {
      setUsers((prevUsers) => [...prevUsers, formData]);
    }

    setFormData((prevFormData) => ({
      ...prevFormData,
      username: '',
      email: '',
      password: '',
    }));
  };

  return (
    <React.Fragment>
      <form className="form" onSubmit={handleFormSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            className="form-controls"
            value={formData.username}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            id="email"
            className="form-controls"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>{' '}
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="text"
            id="password"
            className="form-controls"
            value={formData.password}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit" className="submit-btn">
          Submit
        </button>
      </form>

      <div className="user-gallery">
        {users &&
          users?.map((user: User, i: number) => (
            <UserCard user={user} key={i} />
          ))}
      </div>
    </React.Fragment>
  );
};

export default UseStatePractice;
