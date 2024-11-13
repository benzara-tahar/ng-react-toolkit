import { Todo } from "../../../models/todo";
import { TodoService } from "../services/todo.service";
import angular from 'angular';

class TodoListController implements angular.IOnInit {
    newTodoText: string = '';
    loading;

    static $inject = ['TodoService', '$scope'];


    constructor(private todoService: TodoService, private $scope: angular.IScope) {
        $scope.$watch(() => {
            console.log('running angular digest 🅰️');
        });
    }
    async $onInit() {
        await this.todoService.load();
    }

    getAllTodos(): Todo[] {
        return this.todoService.getAllTodos();
    }

    addTodo(): void {
        if (this.newTodoText.trim()) {
            this.todoService.addTodo(this.newTodoText);
            this.newTodoText = '';
        }
    }

    toggleTodo(id: number): void {
        this.todoService.toggleTodo(id);
    }

    deleteTodo(id: number): void {
        this.todoService.deleteTodo(id);
    }

    getRemainingCount(): number {
        return this.todoService.getRemainingCount();
    }


}

export class TodoListComponent implements angular.IComponentOptions {
    public controller: any;
    public controllerAs: string;
    public template: string;

    constructor() {
        this.controller = TodoListController;
        this.controllerAs = '$ctrl';
        this.template = `
            <article>
                <header>
                    <p>Remaining tasks: {{$ctrl.getRemainingCount()}}</p>
                </header>

                <form ng-submit="$ctrl.addTodo()">
                    <div class="grid">
                        <input 
                            type="text" 
                            ng-model="$ctrl.newTodoText" 
                            placeholder="What needs to be done?"
                            required>
                        <button type="submit">Add Todo</button>
                    </div>
                </form>
                 <p ng-if="$ctrl.todoService.loading"> loading... </p>
                <ul>
                    <li ng-repeat="item in $ctrl.getAllTodos()" class="grid">
                        <button 
                            class="secondary outline" 
                            ng-click="$ctrl.deleteTodo(item.id)">
                            🗑️
                        </button>
                        <label>
                            <input 
                                type="checkbox" 
                                ng-checked="item.completed"
                                ng-click="$ctrl.toggleTodo(item.id)">
                            <span ng-class="{'text-decoration-line-through': item.completed}">
                                {{item.text}}
                            </span>
                        </label>
                        
                    </li>
                </ul>
            </article>
        `;
    }
}