---
sidebar_position: 3
---
# useNgServices hook

`useNgServices` is a React hook that provides access to AngularJS services within React components. This hook is essential for gradually migrating AngularJS applications to React while maintaining access to existing AngularJS services.

## Overview

When migrating from AngularJS to React, you often need to access existing AngularJS services from your new React components. The `useNgServices` hook provides a bridge between these two frameworks, allowing you to inject AngularJS services into React components in a type-safe manner.

## Features

- Type-safe service injection
- Support for multiple services in a single call
- Automatic camelCase conversion for service names
- Memoized results to prevent unnecessary re-renders
- Runtime validation of service availability

## Basic Usage

```typescript
import { useNgServices } from 'ng-react-toolkit';

function MyReactComponent() {
  // Inject a single service
  const { $scope } = useNgServices('$scope');
  
  // Inject multiple services
  const { $scope, myCustomService } = useNgServices('$scope', 'MyCustomService');
  
  return (
    <div>
      {/* Use your injected services here */}
    </div>
  );
}
```

## Advanced Examples

### Accessing Custom Services

```typescript
import { useNgServices } from 'ng-react-toolkit';

function UserProfile() {
  const { userService, authService } = useNgServices(
    'UserService',
    'AuthService'
  );
  
  React.useEffect(() => {
    // Access methods from your AngularJS services
    const userData = userService.getUserData();
    const isAuthenticated = authService.checkAuth();
    // ...
  }, []);
  
  return (
    // ...
  );
}
```

## API Reference

### Syntax

```typescript
const services = useNgServices<T extends InjectToken[]>(...serviceNames: T): ResolveServices<T>
```

### Parameters

- `serviceNames`: A list of AngularJS service names to inject
  - Type: `string[]`
  - Required: Yes
  - Example: `'$scope'`, `'MyCustomService'`

### Returns

- An object containing the requested services with camelCased keys
- Types are automatically inferred from the service names

### Type Definitions

```typescript
type InjectToken = string;  // The name of the AngularJS service

type ResolveServices<T extends InjectToken[]> = {
  [K in T[number] as CamelCase<K>]: InjectServiceResolver<K>
};
```

## Requirements

- Must be used within a React component that's running inside an AngularJS application
- The AngularJS injector must be available (either on `window._injector` or through `element(document.body).injector()`)


3. **Memoization Usage**
   ```typescript
   // The hook result is already memoized internally
   const { myService } = useNgServices('MyService');
   
   // No need for additional useMemo
   const value = myService.getValue(); // ✓ Good
   const value = useMemo(() => myService.getValue(), [myService]); // ✗ Unnecessary
   ```

## Common Gotchas

1. **Service Availability**
   - Ensure all required AngularJS services are registered before accessing them
   - Handle cases where services might not be available

2. **Naming Conventions**
   - Service names are automatically converted to camelCase in the returned object
   - `'MyService'` becomes `myService` in the returned object

3. **Type Safety**
   - Currently, full type support is limited to specific services (like `$scope`)
   - Custom service types need to be properly defined for full type safety

| Error Message | Cause | Solution |
|--------------|-------|----------|
| "injector not found..." | Hook used outside AngularJS context | Ensure the React component is mounted within the AngularJS application |
| "service name not found" | Requested service isn't registered | Verify service name and registration in AngularJS |

## Future Improvements

- [ ] Support for more built-in AngularJS services
- [ ] Better TypeScript inference for custom services
- [ ] Support for service provider configuration