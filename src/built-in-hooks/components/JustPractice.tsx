import {
  FormEvent,
  forwardRef,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

type User = {
  username: string;
  email: string;
  password: string;
};

const initialSingleUserValue = {
  username: "",
  email: "",
  password: "",
};

type UserKeys = keyof User;

type InputFieldPropsType = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error: string;
  id: string;
  type: React.HTMLInputTypeAttribute;
  title: string;
  label: string;
};

const InputField = forwardRef<HTMLInputElement | null, InputFieldPropsType>(
  ({ value, onChange, error, id, type, label, title }, ref) => {
    return (
      <div className="form-control">
        <label htmlFor={id}>{label}</label>
        <input
          title={title}
          value={value}
          ref={ref}
          type={type}
          id={id}
          onChange={onChange}
        />
        {error && (
          <small style={{ color: "red" }} className="error-message">
            {error}
          </small>
        )}
      </div>
    );
  }
);

InputField.displayName = "InputField";

const JustPractice = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [singleUser, setSingleUser] = useState<User>(
    () => initialSingleUserValue
  );
  const [errorMessage, setErrorMessage] = useState<{
    username: string;
    email: string;
    password: string;
  }>({ username: "", email: "", password: "" });
  const refOfName = useRef<null | HTMLInputElement>(null);
  const refOfEmail = useRef<null | HTMLInputElement>(null);
  const refOfPassword = useRef<null | HTMLInputElement>(null);

  const updateErrorFields = useCallback((user: User) => {
    const newErrorMessage = Object.keys(user).reduce((acc, key) => {
      const fieldValue = user[key as UserKeys];
      acc[key as UserKeys] = !fieldValue ? `Pleas, Type valid ${key}` : "";
      return acc;
    }, {} as User);

    setErrorMessage(newErrorMessage);
  }, []);

  const validateFormInput = (user: User): boolean => {
    updateErrorFields(user);
    return Object.values(user).every((value) => value);
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateFormInput(singleUser)) return;

    setUsers((prevUsers) => [...prevUsers, singleUser]);
    setSingleUser(initialSingleUserValue);
  };

  const handleChanges = (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldType: keyof User
  ) => {
    const { value } = e.target;
    //TODO: check if the value is valid and provide real-time error-message
    // setErrorMessage((prev) => ({ ...prev, [fieldType]: "" }));

    setSingleUser((prev) => ({
      ...prev,
      [fieldType]: value,
    }));
  };

  useEffect(() => {
    console.log(errorMessage);
  }, [errorMessage]);

  useEffect(() => {
    console.log(users);
  }, [users]);

  const removeErrorMessage = useCallback((fieldType: keyof User) => {
    setErrorMessage((prev) => ({ ...prev, [fieldType]: "" }));
  }, []);

  useLayoutEffect(() => {
    const refs = [
      {
        inputElement: refOfName.current,
        fieldType: "username",
      },
      {
        inputElement: refOfEmail.current,
        fieldType: "email",
      },
      {
        inputElement: refOfPassword.current,
        fieldType: "password",
      },
    ];

    refs.forEach((ref) => {
      const element = ref.inputElement;
      if (!element) return;

      const handleFocus = () => removeErrorMessage(ref.fieldType as keyof User);

      element.addEventListener("focus", handleFocus);
      return () => {
        element.removeEventListener("focus", handleFocus);
      };
    });
  }, [refOfName, refOfEmail, refOfPassword, removeErrorMessage]);

  return (
    <form className="form" onSubmit={handleFormSubmit}>
      <InputField
        label="Name:"
        id="userName"
        type="text"
        title="username"
        value={singleUser.username}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          handleChanges(e, "username")
        }
        error={errorMessage.username}
        ref={refOfName}
      />

      <InputField
        label="Email:"
        id="email"
        type="email"
        title="email"
        value={singleUser.email}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          handleChanges(e, "email")
        }
        error={errorMessage.email}
        ref={refOfEmail}
      />

      <InputField
        label="Password:"
        id="password"
        type="password"
        title="password"
        value={singleUser.password}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          handleChanges(e, "password")
        }
        error={errorMessage.password}
        ref={refOfPassword}
      />
      <button type="submit" className="submit-btn">
        Submit
      </button>
    </form>
  );
};

export default JustPractice;
