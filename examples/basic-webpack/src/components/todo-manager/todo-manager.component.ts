
import angular from 'angular';
import { Todo } from '../../models/todo';
import { TodoService } from '../../services/todo.service';
import { Inject } from 'ng-react-toolkit';

@Inject('TodoService', '$scope')
class TodoManagerController implements angular.IOnInit {
   newTodoText: string = '';
   loading!: boolean;

   constructor(public todoService: TodoService, $scope: angular.IScope) {
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

export class TodoManagerComponent implements angular.IComponentOptions {
   public controller = TodoManagerController;
   public controllerAs = '$ctrl';
   public templateUrl = '/src/components/todo-manager/todo-manager.component.html';
}
