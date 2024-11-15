
import angular from 'angular';
import { StoreApi } from 'zustand';
import { Todo } from '../../models/todo';
import { TodoService } from '../../services/todo.service';
import { ConnectStore, Inject } from 'ng-react-toolkit';
import { todoStore } from '../../store/useTodoStore';

// interface AngularScope extends angular.IRootScopeService {
//    $root: { $$phase: string | null };
//    $apply: () => void;
//    $on: (event: string, callback: () => void) => void;
//  }

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


@Inject('TodoService', '$scope')
class TodoFilterController {
   filter: 'all' | 'pending' | 'completed' = 'all';
   loading!: boolean;
   lastId!: number;


   constructor(private todoService: TodoService, private $scope: angular.IScope) {
      connectStore(todoStore, this, (state) => {
         console.log('TODO Filter: change ⚡', { state });
         this.lastId = state.lastId;
         // $scope.$digest();
      })
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