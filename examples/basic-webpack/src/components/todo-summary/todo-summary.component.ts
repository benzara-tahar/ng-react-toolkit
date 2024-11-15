
import angular from 'angular';
import { StoreApi } from 'zustand';
import { todoStore } from '../../store/useTodoStore';
import { Inject } from 'ng-react-toolkit';


type AngularScope = any;

export function connectStore<T>(
   store: StoreApi<T>,
   component: any,
   updateFn: (state: T) => void
): void {
   // Get reference to original $onInit
   const originalOnInit = component.$onInit;

   // Override $onInit
   component.$onInit = function (this: { $scope: AngularScope }) {
      console.log(this.$scope)
      // Call original $onInit if it exists
      if (originalOnInit) {
         originalOnInit.call(this);
      }

      // Setup store subscription
      const unsubscribe = store.subscribe(() => {
         // Update component with new state
         updateFn.call(this, store.getState());

         // Trigger digest cycle if not already in progress
         if (!this.$scope.$root.$$phase) {
            this.$scope.$apply();
         }
      });

      // Set initial state
      updateFn.call(this, store.getState());

      // Cleanup on scope destruction
      this.$scope.$on('$destroy', unsubscribe);
   };
}

@Inject('$scope')
class TodoSummaryController {
   remaining!: number;
   store = todoStore;
   
   constructor(protected  readonly $scope: angular.IScope) {
      
      connectStore(todoStore, this, (state) => {
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