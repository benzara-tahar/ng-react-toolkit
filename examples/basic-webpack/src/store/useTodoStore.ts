import { createStore } from 'zustand/vanilla';

import { useStore } from 'zustand';
import { Todo } from '../models/todo';
import { TODOS } from '../mocks';

interface TodoStore {
   todos: Todo[];
   loading: boolean;
   lastId: number;
   loadTodos: () => Promise<void>;
   addTodo: (text: string) => void;
   toggleTodo: (id: number) => void;
   deleteTodo: (id: number) => void;
   getRemainingCount: () => number;
 }

export const todoStore = createStore<TodoStore>((set, get) => ({
   todos: [],
   loading: true,
   lastId: 0,
 
   loadTodos: async () => {
     set({ loading: true });
     await new Promise(resolve => setTimeout(resolve, 1000));
     set({
       todos: [...TODOS],
       lastId: TODOS.length,
       loading: false
     });
   },
 
   addTodo: (text: string) => {
     const { todos, lastId } = get();
     const newTodo: Todo = {
       id: lastId + 1,
       text,
       completed: false,
       createdAt: new Date()
     };
     set({
       todos: [...todos, newTodo],
       lastId: lastId + 1
     });
   },
 
   toggleTodo: (id: number) => {
     const { todos } = get();
     set({
       todos: todos.map(todo =>
         todo.id === id
           ? { ...todo, completed: !todo.completed }
           : todo
       )
     });
   },
 
   deleteTodo: (id: number) => {
     const { todos } = get();
     set({
       todos: todos.filter(todo => todo.id !== id)
     });
   },
 
   getRemainingCount: () => {
     const { todos } = get();
     return todos.filter(todo => !todo.completed).length;
   }
 }));
 
 // Create a hook for use in React components
 export const useTodoStore = () => useStore(todoStore);