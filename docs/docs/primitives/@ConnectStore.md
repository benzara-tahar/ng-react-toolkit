---
sidebar_position: 2
---
# @ConnectStore Decorator

The `@ConnectStore` decorator provides a seamless integration between AngularJS controllers and Zustand stores. It enables modern state management practices in legacy AngularJS applications by connecting Zustand's predictable state container to AngularJS's digest cycle.

## Overview

When modernizing AngularJS applications, state management often becomes a crucial pain point. The `@ConnectStore` decorator solves this by:

- Connecting Zustand stores to AngularJS controllers
- Automatically triggering AngularJS digest cycles
- Providing type-safe state updates
- Handling cleanup on controller destruction

## Basic Usage

```typescript
import { createStore } from 'zustand/vanilla';
import { ConnectStore } from 'ng-react-toolkit';

// 1. Define your store state and actions
interface CounterState {
  count: number;
  increment: () => void;
  decrement: () => void;
}

// 2. Create a Zustand vanilla store
const counterStore = createStore<CounterState>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 }))
}));

// 3. Connect the store to your AngularJS controller
class CounterController {
  public count: number = 0;
  
  static $inject = ['$scope'];
  
  @ConnectStore(counterStore, function(this: CounterController, state) {
    this.count = state.count;
  })
  constructor(public $scope: ng.IScope) {}
  
  increment() {
    counterStore.getState().increment();
  }
  
  decrement() {
    counterStore.getState().decrement();
  }
}
```

## Advanced Examples

### Complex State Management

```typescript
interface UserState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  fetchUser: (id: string) => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;
}

const userStore = createStore<UserState>((set) => ({
  user: null,
  isLoading: false,
  error: null,
  fetchUser: async (id) => {
    set({ isLoading: true });
    try {
      const user = await api.getUser(id);
      set({ user, isLoading: false });
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },
  updateProfile: async (data) => {
    // Implementation
  }
}));

class UserProfileController {
  public user: User | null = null;
  public isLoading: boolean = false;
  public error: string | null = null;
  
  static $inject = ['$scope'];
  
  @ConnectStore(userStore, function(this: UserProfileController, state) {
    this.user = state.user;
    this.isLoading = state.isLoading;
    this.error = state.error;
  })
  constructor(public $scope: ng.IScope) {
    userStore.getState().fetchUser('123');
  }
  
  updateProfile(data: Partial<User>) {
    userStore.getState().updateProfile(data);
  }
}
```

### Multiple Stores

```typescript
class DashboardController {
  static $inject = ['$scope'];
  
  @ConnectStore(userStore, function(this: DashboardController, state) {
    this.user = state.user;
  })
  @ConnectStore(notificationStore, function(this: DashboardController, state) {
    this.notifications = state.notifications;
  })
  constructor(public $scope: ng.IScope) {}
}
```

### Computed Values

```typescript
class CartController {
  public items: CartItem[] = [];
  public total: number = 0;
  
  static $inject = ['$scope'];
  
  @ConnectStore(cartStore, function(this: CartController, state) {
    this.items = state.items;
    this.total = state.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
  })
  constructor(public $scope: ng.IScope) {}
}
```

## API Reference

### Decorator Signature

```typescript
function ConnectStore<T>(
  store: StoreApi<T>,
  updateFn: (state: T) => void
): MethodDecorator
```

### Parameters

1. `store: StoreApi<T>`
   - The Zustand vanilla store instance
   - Must be created using `createStore` from 'zustand/vanilla'

2. `updateFn: (state: T) => void`
   - Callback function that receives the store state
   - `this` context is bound to the controller instance
   - Used to sync store state with controller properties

## Key Features

1. **Automatic Digest Cycle**
   - Triggers `$scope.$apply()` when store updates
   - Prevents unnecessary digest cycles if one is in progress

2. **Cleanup Management**
   - Automatically unsubscribes from store on controller destruction
   - Prevents memory leaks

3. **Type Safety**
   - Full TypeScript support
   - Type inference for store state and actions

## Best Practices

1. **Store Creation**
   ```typescript
   // ✅ Create stores outside controllers
   const store = createStore(...);
   
   class MyController {
     @ConnectStore(store, ...)
     constructor() {}
   }
   ```

2. **State Updates**
   ```typescript
   // ✅ Update state through store actions
   class MyController {
     updateUser() {
       userStore.getState().updateUser(data);
     }
     
     // ❌ Don't modify store state directly
     // updateUser() {
     //   this.user = newUser;
     // }
   }
   ```

3. **Performance Optimization**
   ```typescript
   @ConnectStore(store, function(state) {
     // ✅ Only sync needed properties
     this.relevantData = state.relevantData;
     
     // ❌ Avoid syncing entire state
     // this.state = state;
   })
   ```

## Migration Tips

1. **Gradual Store Adoption**
   ```typescript
   // Start with small, isolated features
   const featureStore = createStore(...);
   
   // Keep existing services temporarily
   class FeatureController {
     static $inject = ['$scope', 'legacyService'];
     
     @ConnectStore(featureStore, ...)
     constructor($scope, legacyService) {
       // Mix new and old patterns during migration
     }
   }
   ```

2. **State Migration**
   ```typescript
   // Migrate from $scope state to store state
   class OldController {
     constructor($scope) {
       $scope.data = {};  // Old way
     }
   }
   
   // New approach
   const store = createStore(...);
   
   class NewController {
     @ConnectStore(store, ...)
     constructor($scope) {
       // State managed by store
     }
   }
   ```

## Common Gotchas

1. **Store Instance Sharing**
   ```typescript
   // ❌ Don't create store instances in controllers
   class WrongController {
     @ConnectStore(createStore(...), ...)  // New instance each time!
     constructor() {}
   }
   
   // ✅ Share store instance
   const store = createStore(...);
   
   class CorrectController {
     @ConnectStore(store, ...)
     constructor() {}
   }
   ```

2. **Circular Dependencies**
   ```typescript
   // ❌ Avoid circular updates
   @ConnectStore(store, function(state) {
     store.setState(...)  // Don't update store in sync function!
   })
   ```

3. **Scope Digest**
   ```typescript
   // The decorator handles digest cycles automatically
   // ❌ Don't manually trigger digest
   @ConnectStore(store, function(state) {
     this.data = state.data;
     this.$scope.$apply();  // Unnecessary!
   })
   ```

## Testing

```typescript
describe('CounterController', () => {
  let $scope: ng.IScope;
  let controller: CounterController;
  
  beforeEach(inject(($rootScope) => {
    $scope = $rootScope.$new();
    controller = new CounterController($scope);
  }));
  
  it('should sync with store state', () => {
    counterStore.setState({ count: 5 });
    expect(controller.count).toBe(5);
  });
  
  it('should cleanup on destroy', () => {
    const unsubscribeSpy = jasmine.createSpy('unsubscribe');
    spyOn(counterStore, 'subscribe').and.returnValue(unsubscribeSpy);
    
    $scope.$destroy();
    expect(unsubscribeSpy).toHaveBeenCalled();
  });
});
```