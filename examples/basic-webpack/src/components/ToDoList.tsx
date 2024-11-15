import React, { useEffect } from "react";
import { useTodoStore } from "../store/useTodoStore";
import { useNgServices } from "ng-react-toolkit";

type Props = {};
export const TodoList: React.FC<Props> = ({}) => {
  const { todoService } = useNgServices("TodoService") as any;
  const { todos, loading, loadTodos, toggleTodo, deleteTodo } = useTodoStore();

  useEffect(() => {
    loadTodos();
  }, [loadTodos]);

  console.log("react render ⚛️");

  return (
    <article className="pure-g react">
      <code className="component-name-tag">{"<ToDoList/>"}</code>

      <div className="pure-u-1">
        <header>
          <b>Count : {todoService.count} </b>
          &nbsp;
          <button
            type="button"
            className="pure-button pure-button-warning button-small"
            onClick={() => {
              todoService.count++;
              console.log({ todoService });
            }}
          >
            increment count
          </button>
        </header>

        {loading && <p className="todo-loading">Loading...</p>}

        <ul className="todo-list">
          {todos.map((item) => (
            <li key={item.id} className="todo-item">
              <button
                onClick={() => deleteTodo(item.id)}
                className="todo-delete"
                aria-label="Delete todo"
              >
                🗑️
              </button>
              <label className="todo-label">
                <input
                  type="checkbox"
                  checked={item.completed}
                  onChange={() => toggleTodo(item.id)}
                  className="todo-checkbox"
                />
                <span
                  className={
                    item.completed ? "todo-text completed" : "todo-text"
                  }
                >
                  {item.text}
                </span>
              </label>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
};
