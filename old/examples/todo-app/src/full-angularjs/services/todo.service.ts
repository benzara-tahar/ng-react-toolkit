import { Todo } from "../../../models/todo";
import { TODOS } from "./data";


export class TodoService {
    loading: boolean;
    private todos: Todo[] = [];
    private lastId: number = 0;


    static $inject = ['$q'];

    constructor(private $q: angular.IQService) { }

    async load(): Promise<void> {
        return this.$q<void>((resolve) => {
            this.loading = true;
            setTimeout(() => {
                this.todos = [...TODOS];
                this.lastId = TODOS.length;
                this.loading = false;
                resolve();
            }, 1000);
        });
    }

    getAllTodos(): Todo[] {

        return this.todos;
    }

    addTodo(text: string): void {
        this.todos.push({
            id: ++this.lastId,
            text,
            completed: false,
            createdAt: new Date()
        });
    }

    toggleTodo(id: number): void {
        const todo = this.todos.find(t => t.id === id);
        if (todo) {
            todo.completed = !todo.completed;
        }
    }

    deleteTodo(id: number): void {
        this.todos = this.todos.filter(t => t.id !== id);
    }

    getRemainingCount(): number {
        return this.todos.filter(t => !t.completed).length;
    }
}
