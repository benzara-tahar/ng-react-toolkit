---
sidebar_position: 1
---
# @Inject Decorator

The `@Inject` decorator provides a modern TypeScript approach to declaring AngularJS dependencies. It replaces the traditional `$inject` array syntax with a more maintainable and type-safe decorator pattern.

## Overview

When migrating AngularJS applications to a more modern architecture, one of the first pain points is the verbose dependency injection syntax. The `@Inject` decorator modernizes this aspect by providing:

- Type-safe dependency declaration
- Compile-time dependency validation
- Modern decorator syntax
- Automatic `$inject` property generation

## Basic Usage

```typescript
import { Inject } from 'ng-react-toolkit';

@Inject('$scope', 'UserService')
class UserController {
  constructor($scope: ng.IScope, userService: UserService) {
    // Constructor implementation
  }
}
```

## Examples

### Simple Controller

```typescript
import { Inject } from 'ng-react-toolkit';

@Inject('$scope', 'UserService', 'AuthService')
class UserProfileController {
  constructor(
    private $scope: ng.IScope,
    private userService: UserService,
    private authService: AuthService
  ) {
    this.loadUserProfile();
  }

  private loadUserProfile() {
    // Implementation
  }
}
```

### Service with Dependencies

```typescript
import { Inject } from 'ng-react-toolkit';

@Inject('$http', 'ConfigService')
class ApiService {
  constructor(
    private $http: ng.IHttpService,
    private configService: ConfigService
  ) {}

  getData() {
    return this.$http.get(this.configService.getApiUrl());
  }
}
```

### Factory with Dependencies

```typescript
import { Inject } from 'ng-react-toolkit';

@Inject('$q', 'AuthService')
class UserFactory {
  constructor(
    private $q: ng.IQService,
    private authService: AuthService
  ) {}

  createUser(userData: UserData) {
    // Implementation
  }
}
```

## Comparison with Traditional AngularJS

### Before (Traditional AngularJS)
```typescript
// Old way
class UserController {
  static $inject = ['$scope', 'UserService'];
  
  constructor($scope: ng.IScope, userService: UserService) {
    // Implementation
  }
}
```

### After (Using @Inject)
```typescript
// Modern way with @Inject
@Inject('$scope', 'UserService')
class UserController {
  constructor($scope: ng.IScope, userService: UserService) {
    // Implementation
  }
}
```

## API Reference

### Decorator Signature

```typescript
function Inject(...dependencies: readonly InjectToken[]): ClassDecorator
```

### Parameters

- `dependencies`: An array of dependency names (strings) that match the constructor parameters
  - Type: `readonly InjectToken[]`
  - Required: Yes
  - Example: `@Inject('$scope', 'UserService')`

### Generated Output

The decorator generates a `$inject` property on the target class with the following characteristics:

```typescript
{
  value: string[],      // Array of dependency names
  writable: true,       // Can be modified
  enumerable: true,     // Visible in iterations
  configurable: false   // Cannot be deleted or reconfigured
}
```

## Error Handling

The decorator includes built-in validation to ensure the number of declared dependencies matches the constructor parameters.

### Error Examples

```typescript
// ❌ Error: Missing dependency
@Inject('$scope')  // Only one dependency declared
class UserController {
  constructor($scope: ng.IScope, userService: UserService) {  // Two parameters
    // Error: @Inject Error (missing dependencies: 1)
  }
}

// ❌ Error: Extra dependency
@Inject('$scope', 'UserService', 'ExtraService')  // Three dependencies
class UserController {
  constructor($scope: ng.IScope, userService: UserService) {  // Two parameters
    // Error: @Inject Error (extra dependencies: 1)
  }
}

// ✅ Correct usage
@Inject('$scope', 'UserService')  // Two dependencies
class UserController {
  constructor($scope: ng.IScope, userService: UserService) {  // Two parameters
    // Works correctly
  }
}
```

## Best Practices

1. **Order Matters**
   ```typescript
   // Ensure dependency order matches constructor parameters
   @Inject('$scope', 'UserService')
   class UserController {
     constructor($scope: ng.IScope, userService: UserService) {
       // Correct order
     }
   }
   ```

2. **Type Safety**
   ```typescript
   // Use TypeScript interfaces for better type safety
   interface IUserService {
     getUser(): Promise<User>;
   }

   @Inject('$scope', 'UserService')
   class UserController {
     constructor(
       private $scope: ng.IScope,
       private userService: IUserService
     ) {}
   }
   ```

3. **Consistent Naming**
   ```typescript
   // Use consistent service names across your application
   @Inject('UserService')  // Use the exact service name as registered in AngularJS
   ```

## Migration Tips

1. **Gradual Migration**
   ```typescript
   // Start with new components
   @Inject('$scope', 'NewService')
   class NewFeatureController {
     // New features using modern syntax
   }

   // Gradually refactor existing components
   class LegacyController {
     static $inject = ['$scope', 'OldService'];
     // Refactor this later
   }
   ```

2. **Dependencies Audit**
   - Keep track of services being injected
   - Document service dependencies
   - Plan migration order based on dependencies

3. **Testing Considerations**
   ```typescript
   // The decorator preserves testability
   describe('UserController', () => {
     it('should be injectable', () => {
       expect(UserController.$inject).toEqual(['$scope', 'UserService']);
     });
   });
   ```

## Common Gotchas

1. **Decorator Order**
   - `@Inject` should be the last decorator if multiple decorators are used
   - Other decorators might interfere with the `$inject` property

2. **Inheritance**
   - Each class needs its own `@Inject` decorator
   - Parent class dependencies are not automatically inherited

3. **Minification**
   - The decorator maintains minification safety
   - No need for additional minification protection

## TypeScript Configuration

Ensure your `tsconfig.json` has decorators enabled:

```json
{
  "compilerOptions": {
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true
  }
}
```