
import angular from 'angular';
import { Todo } from '../../models/todo';
import { TodoService } from '../../services/todo.service';
import { Inject } from 'ng-react-toolkit';

@Inject('TodoService', '$scope')
class TodoFilterController  {
   filter: 'all' | 'pending' | 'completed' = 'all';
   loading!: boolean;

   constructor(private todoService: TodoService, $scope: angular.IScope) {
      $scope.$watch(() => {
         console.log('TODO Filter: running angular digest 🅰️');
      });
   }

}

export class TodoFilterComponent implements angular.IComponentOptions {
   public controller = TodoFilterController;
   public controllerAs = '$ctrl';
   public templateUrl = '/src/components/todo-filter/todo-filter.component.html';
}