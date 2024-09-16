import { useCallback, useEffect, useReducer, useRef, useState } from "react";

type TodoItemType = {
  id: number | undefined;
  todoText: string;
  complete: boolean;
};

type AddItemAction = { type: "ADD_TODO_ITEM"; todoText: string };
type UpdateItemAction = {
  type: "UPDATE_TODO_ITEM";
  id: number;
  todoText: string;
};
type DeleteItemAction = { type: "DELETE_TODO_ITEM"; id: number };
type ToggleItemAction = { type: "TOGGLE_TODO_ITEM"; id: number };

type ActionsType =
  | AddItemAction
  | UpdateItemAction
  | DeleteItemAction
  | ToggleItemAction;

const initialTodoState: TodoItemType[] = [];

const todoReducer = (
  todoList: TodoItemType[],
  action: ActionsType
): TodoItemType[] => {
  switch (action.type) {
    case "ADD_TODO_ITEM": {
      const newTodo = {
        id: Date.now(),
        todoText: action.todoText,
        complete: false,
      };
      return [...todoList, newTodo];
    }
    case "UPDATE_TODO_ITEM": {
      return todoList.map((todo: TodoItemType) => {
        if (todo.id === action.id) {
          return { ...todo, todoText: action.todoText };
        }
        return todo;
      });
    }
    case "TOGGLE_TODO_ITEM": {
      return todoList.map((todo: TodoItemType) => {
        if (todo.id === action.id) {
          return { ...todo, complete: !todo.complete };
        }
        return todo;
      });
    }
    case "DELETE_TODO_ITEM": {
      return todoList.filter(({ id }: TodoItemType) => id !== action.id);
    }
    default: {
      return todoList;
    }
  }
};

const UseReducerPractice = () => {
  const [todoText, setTodoText] = useState<string>("");
  const [todoList, dispatch] = useReducer(todoReducer, initialTodoState);
  const [isTodoValid, setIsTodoValid] = useState<boolean>(true);
  const inputRef = useRef<null | HTMLInputElement>(null);
  const updatedTodoRef = useRef<undefined | number>(undefined);

  const handleTodoSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!todoText.trim()) {
      setIsTodoValid(false);
      return;
    }

    if (updatedTodoRef.current) {
      dispatch({
        type: "UPDATE_TODO_ITEM",
        id: updatedTodoRef.current,
        todoText,
      });
      updatedTodoRef.current = undefined;
      setTodoText("");
    } else {
      dispatch({ type: "ADD_TODO_ITEM", todoText: todoText });
      setTodoText("");
    }
  };

  const handleTodoUpdate = useCallback((todo: TodoItemType): void => {
    if (inputRef.current) {
      inputRef.current.value = todo.todoText;
      updatedTodoRef.current = todo.id;
    }
  }, []);

  const handleTodoToggle = (id: number | undefined) => {
    if (!id) return;
    dispatch({ type: "TOGGLE_TODO_ITEM", id });
  };

  const handleTodoDelete = useCallback((id: number | undefined): void => {
    if (!id) return;
    dispatch({ type: "DELETE_TODO_ITEM", id });
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodoText(e.target.value);
  };

  useEffect(() => {
    console.log(todoList);
  }, [todoList]);

  useEffect(() => {
    const inputElement = inputRef.current;
    if (!inputElement) return;

    const removeErrorMessage = () => setIsTodoValid(true);

    inputElement.addEventListener("focus", removeErrorMessage);
    return () => {
      inputElement.addEventListener("focus", removeErrorMessage);
    };
  }, [isTodoValid]);

  return (
    <div className="todo-app-container">
      <form className="todo-form" onSubmit={handleTodoSubmit}>
        <div className="from-group">
          <label htmlFor="todo-input">
            <input
              ref={inputRef}
              type="text"
              id="todo-input"
              placeholder="e.g. Milk"
              title="todo"
              value={todoText}
              onChange={handleInputChange}
            />
          </label>
          {!isTodoValid && <small>Please, enter a valid todo item</small>}
        </div>
        <button className="btn" type="submit">
          {updatedTodoRef.current ? "Update Todo" : "Add Item"}
        </button>
      </form>
      {todoList.map(({ id, todoText, complete }: TodoItemType) => (
        <div className="todo-item" key={id}>
          <h4
            className="todo_name"
            style={{ color: complete ? "grey" : "black" }}
          >
            {todoText}
          </h4>
          <div className="todo-actions">
            <button
              type="button"
              className="update-item-btn"
              onClick={() => handleTodoUpdate({ id, todoText, complete })}
            >
              Update
            </button>
            <button
              type="button"
              className="toggle-item-btn"
              onClick={() => handleTodoToggle(id)}
            >
              Toggle
            </button>
            <button
              type="button"
              className="delete-item-btn"
              onClick={() => handleTodoDelete(id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UseReducerPractice;
