import React, { useState, useEffect } from "react";
import { useTodoStore } from "../store/useTodoStore";

export const AddToDoForm: React.FC = () => {
  const [newTodoText, setNewTodoText] = useState("");
  const { addTodo } = useTodoStore();

  function handleAddClick(e: any) {
    e.preventDefault();
    const text = newTodoText.trim();
    if (text === "") {
      return;
    }
    addTodo(text);
    setNewTodoText("");
  }

  return (
    <form className="pure-form react">
      <div className="todo-input-group">

      
      <input
        type="text"
        value={newTodoText}
        onChange={(e) => setNewTodoText(e.target.value)}
        placeholder="What needs to be done in angular?"
        className="pure-input-1"
        required
        />
      <button
        className="pure-button pure-button-primary"
        onClick={handleAddClick}
        >
        Add
      </button>
        </div>
    </form>
  );
};
