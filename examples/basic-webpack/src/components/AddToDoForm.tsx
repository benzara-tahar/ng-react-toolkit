import React, { useState, useEffect } from "react";
import { useTodoStore } from "../store/useTodoStore";

export const AddToDoForm: React.FC = () => {
  const [newTodoText, setNewTodoText] = useState("");
  const {
    todos,
    loading,
    loadTodos,
    addTodo,
    toggleTodo,
    deleteTodo,
    getRemainingCount,
  } = useTodoStore();

  function handleAddClick() {
    const text = newTodoText.trim();
    if (text === "") {
      return;
    }
    addTodo(text);
  }

  return (
    <form>
      <p>Add to do form</p>
      <input
        type="text"
        value={newTodoText}
        onChange={(e) => setNewTodoText(e.target.value)}
        required
      />
      <button onClick={handleAddClick}>Add</button>
    </form>
  );
};
