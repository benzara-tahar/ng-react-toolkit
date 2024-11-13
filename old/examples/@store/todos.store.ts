import {create} from 'zustand';

const useTodoStore = create((set) => ({
  todos: [
    { id: 1, text: 'Learn AngularJS', done: false },
    { id: 2, text: 'Build a todo app', done: false }
  ],
  nextId: 3,
  
  addTodo: (text) => set((state) => ({
    todos: [...state.todos, {
      id: state.nextId,
      text,
      done: false
    }],
    nextId: state.nextId + 1
  })),

  toggleTodo: (todoId) => set((state) => ({
    todos: state.todos.map(todo =>
      todo.id === todoId ? { ...todo, done: !todo.done } : todo
    )
  })),

  deleteTodo: (todoId) => set((state) => ({
    todos: state.todos.filter(todo => todo.id !== todoId)
  })),

  // Helper method to get current state (useful for services)
  getState: () => useTodoStore.getState()
}));

export default useTodoStore;