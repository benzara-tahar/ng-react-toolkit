import { Todo } from "../../../models/todo";

export const TODOS: Todo[] = [
   {
       id: 1,
       text: "Review pull requests",
       completed: true,
       createdAt: new Date('2024-11-11')
   },
   {
       id: 2,
       text: "Update documentation",
       completed: false,
       createdAt: new Date('2024-11-11')
   },
   {
       id: 3,
       text: "Fix production bug",
       completed: false,
       createdAt: new Date('2024-11-12')
   },
   {
       id: 4,
       text: "Write unit tests",
       completed: true,
       createdAt: new Date('2024-11-12')
   },
   {
       id: 5,
       text: "Deploy new features",
       completed: false,
       createdAt: new Date('2024-11-12')
   }
];