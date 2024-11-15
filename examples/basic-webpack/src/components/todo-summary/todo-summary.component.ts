
import angular from 'angular';
import { todoStore } from '../../store/useTodoStore';
import { connectStore, Inject } from 'ng-react-toolkit';



@Inject('$scope')
class TodoSummaryController {
   remaining!: number;
   store = todoStore;

   constructor(protected readonly $scope: angular.IScope) {

      connectStore(todoStore, this as any, (state) => {
         this.remaining = state.getRemainingCount();
      })
   }
}

export class TodoSummaryComponent implements angular.IComponentOptions {
   public controller = TodoSummaryController;
   public controllerAs = '$ctrl';
   public templateUrl = '/src/components/todo-summary/todo-summary.component.html';
}





// $scope.$watch(() => {
//    console.log('TODO Filter: running angular digest 🅰️');
// });