import { useCallback } from 'react';
import useTodoStore from '../@store/todos.store';

export const useTodoActions = () => {
  const addTodo = useTodoStore(state => state.addTodo);
  const toggleTodo = useTodoStore(state => state.toggleTodo);
  const deleteTodo = useTodoStore(state => state.deleteTodo);

  return {
    addTodo: useCallback(addTodo, []),
    toggleTodo: useCallback(toggleTodo, []),
    deleteTodo: useCallback(deleteTodo, [])
  };
};
