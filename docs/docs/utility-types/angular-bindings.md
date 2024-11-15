---
sidebar_position: 1
---

# TypedBinding

`TypedBinding` is a type utility that provides type-safe bindings when creating AngularJS components that will interop with React. It ensures that your component bindings are properly typed while maintaining AngularJS binding syntax.


## Usage

Import the `TypedBinding` type from the library:

```typescript
import { TypedBinding } from "ng-react-toolkit";
```

## API Reference

### AngularBinding Types

The following binding types are supported:

- `@` - Text binding (one-way string binding)
- `=` - Two-way binding
- `&` - Method binding (for callbacks/functions)
- `<` - One-way binding
- `?` - Optional binding (can be combined with other binding types)

## Example: Counter Component

Here's a complete example of a counter component using `TypedBinding`:

```typescript
import { TypedBinding } from "ng-react-toolkit";
import { Inject } from "ng-react-toolkit/decorators";

// Define the component props interface
type CounterProps = {
    initialCount: number;
    onCountChange: (count: number) => void;
    label?: string;  // Optional prop
};

export class CounterComponent implements angular.IComponentOptions {
    // Type-safe bindings using TypedBinding
    bindings?: TypedBinding<CounterProps> = {
        initialCount: "<",
        onCountChange: "&",
        label: "@?"  // Optional text binding
    };
    controllerAs = "ctrl";
    controller = CounterController;
    template = `
        <div>
            <h3>{{ctrl.label || 'Counter'}}</h3>
            <button ng-click="ctrl.decrement()">-</button>
            <span>{{ctrl.count}}</span>
            <button ng-click="ctrl.increment()">+</button>
        </div>
    `;
}

@Inject("$scope")
export class CounterController implements angular.IComponentController, angular.IOnInit {
    initialCount: CounterProps['initialCount'];
    onCountChange: CounterProps['onCountChange'];
    label: CounterProps['label'];
    
    count: number;

    constructor(private readonly $scope: angular.IScope) {}

    $onInit(): void {
        this.count = this.initialCount || 0;
    }

    increment(): void {
        this.count++;
        this.onCountChange({ count: this.count });
    }

    decrement(): void {
        this.count--;
        this.onCountChange({ count: this.count });
    }
}
```

## Best Practices

1. **Type Definition**
   - Always define a Props type interface for your component
   - Use specific types rather than `any`
   - Consider making props optional with `?` when appropriate

2. **Binding Selection**
   - Use `<` for one-way bindings when possible (better performance)
   - Use `&` for callbacks/event handlers
   - Use `@` for simple string inputs
   - Add `?` suffix for optional bindings

3. **Type Safety**
   - TypedBinding will show errors if:
     - You use an invalid binding type
     - You miss a required prop
     - You use incorrect types for props

## Common Gotchas

1. Remember that AngularJS bindings in the template use kebab-case (`initial-count`), while the TypeScript properties use camelCase (`initialCount`)
2. Method bindings (`&`) require you to pass parameters as an object in AngularJS templates
3. Optional bindings must use the `?` suffix in the binding definition
