# AngularJS to React Migration Toolkit


⚠️ **Work In Progress - Not Production Ready**

> **WARNING**: This library is currently in early development stage (v0.0.x) and is **NOT** ready for production use. APIs may change significantly between versions without notice.

# ng-react-toolkit

Modernize your AngularJS applications with React, seamlessly and incrementally. ng-react-toolkit provides a set of primitives and opinionated recipes to help you migrate legacy AngularJS applications to React without a complete rewrite.


[![npm version](https://img.shields.io/npm/v/ng-react-toolkit.svg)](https://www.npmjs.com/package/ng-react-toolkit)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)


## Features

- 🔄 **Incremental Migration**: Migrate component by component while keeping your application functional
- 🛠 **Rich Primitives**: Ready-to-use tools for common migration patterns
- 📚 **Best Practices**: Opinionated recipes based on real-world migration experiences
- 🔌 **Seamless Integration**: Smooth interoperability between AngularJS and React components

## Installation

```bash
# Using npm
npm install ng-react-toolkit

# Using yarn
yarn add ng-react-toolkit
```

## Quick Start

1. Configure ng-react-toolkit in your AngularJS module:

```javascript
import 'ng-react-toolkit';
import angular from 'angular';

angular.module('yourApp', ['ng-react-toolkit']);
```

2. Use React components in your AngularJS templates:

```html
<react-component 
  component="YourReactComponent"
  props="{ message: 'Hello from React!' }">
</react-component>
```

## Key Features

### @Inject Decorator
Modern TypeScript approach to declaring AngularJS dependencies:

```typescript
import { Inject } from 'ng-react-toolkit';

@Inject('$scope', 'UserService')
class UserController {
  constructor($scope: ng.IScope, userService: UserService) {
    // Constructor implementation
  }
}
```

### useNgServices Hook
Access AngularJS services within React components:

```typescript
import { useNgServices } from 'ng-react-toolkit';

function UserProfile() {
  const { userService, authService } = useNgServices(
    'UserService',
    'AuthService'
  );
  // Use services...
}
```

### @ConnectStore Decorator
Bridge between AngularJS controllers and Zustand stores:

```typescript
import { ConnectStore } from 'ng-react-toolkit';

@ConnectStore(userStore, function(state) {
  this.user = state.user;
})
class UserController {
  // Controller implementation
}
```

## Requirements

- AngularJS 1.x
- Node.js version 16.0 or above
- TypeScript with decorators enabled

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments


- [angular2react](https://github.com/coatue-oss/angular2react) - Coatue's library for converting AngularJS components to React
- [ngReact](https://github.com/ngReact/ngReact) - Use React Components in Angular Applications
- [ngx-zustand](https://github.com/Alfxjx/ngx-zustand) - Zustand implementation for ng
- [zustand-lit](https://github.com/ennjin/zustand-lit) - A zustand adapter for lit.js (LitElement)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

