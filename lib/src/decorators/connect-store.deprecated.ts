import type { StoreApi } from 'zustand';

interface AngularController {
  $scope: ng.IScope;
  [key: string]: any;
}
/**
 *  connect to zustand vanilla store
 * usage example
 * import { createStore } from 'zustand/vanilla';
 * @example
 * interface CounterState {
 *   count: number;
 *   increment: () => void;
 *   decrement: () => void;
 * }
 * 
 * export const counterStore = createStore<CounterState>((set) => ({
 *   count: 0,
 *   increment: () => set((state) => ({ count: state.count + 1 })),
 *   decrement: () => set((state) => ({ count: state.count - 1 }))
 * }));
 * 
 * class CounterController {
 *   public count: number = 0;
 *   
 *   static $inject = ['$scope'];
 *   \@ConnectStore(counterStore, function(this: CounterController, state) {
 *     this.count = state.count;
 *   })
 *   constructor(public $scope: ng.IScope) {}
 *   increment() {
 *     counterStore.getState().increment();
 *   }
 *   decrement() {
 *     counterStore.getState().decrement();
 *   }
 * }
 * 
 * @param store 
 * @param updateFn 
 * @returns 
 */
export function ConnectStoreDecorator<T>(store: StoreApi<T>, updateFn: (state: T) => void): ClassDecorator {
  return function(target: any, _propertyKey: string, descriptor: PropertyDescriptor) {
    console.log({ target, _propertyKey, descriptor}); 
    const originalFn = descriptor.value;


    descriptor.value = function(this: AngularController, ...args: any[]) {
      // Call the original constructor
      const result = originalFn.apply(this, args);

      // Setup store subscription
      const unsubscribe = store.subscribe(() => {
        // Update controller with new state
        updateFn.call(this, store.getState());
        
        // Trigger digest cycle if not already in progress
        if (!this.$scope.$root.$$phase) {
          this.$scope.$apply();
        }
      });

      // Initial state
      updateFn.call(this, store.getState());

      // Cleanup on scope destruction
      this.$scope.$on('$destroy', unsubscribe);

      return result;
    };

    return descriptor;
  } as ClassDecorator;
}