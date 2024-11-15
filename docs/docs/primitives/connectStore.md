---
sidebar_position: 2
---
# connectStore 

The `connectStore` function provides a seamless integration between AngularJS controllers and Zustand stores. It enables modern state management practices in legacy AngularJS applications by connecting Zustand's predictable state container to AngularJS's digest cycle.


## Overview

`connectStore` synchronizes a Zustand store's state with an AngularJS component, automatically triggering digest cycles when the store updates.

## Type Parameters

- `T`: The type of the Zustand store's state
- `C`: The type of the AngularJS component (extends `IComponent`)

## Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `store` | `StoreApi<T>` | The Zustand store instance |
| `component` | `C` | The AngularJS component to connect |
| `updateFn` | `(this: C, state: T) => void` | Function called when store state changes |

## Features

- Preserves existing `$onInit` lifecycle hooks
- Automatically triggers AngularJS digest cycles
- Cleans up subscriptions on component destruction
- Type-safe integration with TypeScript

## Example Usage

```typescript
// Define your Zustand store
const useStore = create<TodoState>((set) => ({
  todos: [],
  addTodo: (todo) => set((state) => ({ 
    todos: [...state.todos, todo] 
  }))
}));

// Connect store to AngularJS component
@Inject('$scope')
class TodoListController implements IComponent {
  public todos: Todo[] = [];
  
  
  constructor(private $scope: IScope) {
    connectStore(useStore, this, function(state) {
      this.todos = state.todos;
    });
  }
}



// Register component
angular.module('app').component('todoList', {
  controller: TodoListController,
  template: `
    <ul>
      <li ng-repeat="todo in $ctrl.todos">{{todo.text}}</li>
    </ul>
  `
});
```

## Best Practices

1. Keep update functions focused and minimal
2. Avoid complex state transformations in the update function
3. Use TypeScript for type safety
4. Remember component scope is automatically handled

## Error Handling

The function handles common edge cases:
- Ensures digest cycles aren't triggered during existing cycles
- Properly cleans up subscriptions
- Preserves existing lifecycle hooks

## Notes

- Only connects to a single store per call
- Updates are queued using `$applyAsync` for better performance
- Compatible with both TypeScript and JavaScript codebases