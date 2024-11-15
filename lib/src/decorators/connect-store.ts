import { StoreApi } from "zustand";

export function connectStore<T, C extends IComponent = IComponent>(
  store: StoreApi<T>,
  component: C,
  updateFn: (this: C, state: T) => void
): void {
  const originalOnInit = component.$onInit;

  component.$onInit = function (this: C) {
    if (originalOnInit) {
      originalOnInit.call(this);
    }

    const unsubscribe = store.subscribe(() => {
      updateFn.call(this, store.getState());

      if (!this.$scope.$root.$$phase) {
        this.$scope.$applyAsync();
      }
    });

    updateFn.call(this, store.getState());
    this.$scope.$on('$destroy', unsubscribe);
  };
}


// types
interface IAngularScope {
  $root: { $$phase: string | null };
  $on(event: string, callback: () => void): void;
  $applyAsync(): void;
}

interface IComponent {
  $onInit?: () => void;
  $scope: IAngularScope;
}