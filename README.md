# AngularJS to React Migration Toolkit


⚠️ **Work In Progress - Not Production Ready**

> **WARNING**: This library is currently in early development stage (v0.0.x) and is **NOT** ready for production use. APIs may change significantly between versions without notice.


A comprehensive toolkit and guide for incrementally migrating AngularJS (1.x) applications to modern React. This repository provides utilities, patterns, and real-world examples to help teams successfully transition their legacy AngularJS applications to React while maintaining production stability.

[![npm version](https://img.shields.io/npm/v/ng-react-toolkit.svg)](https://www.npmjs.com/package/ng-react-toolkit)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Key Features

- 🔄 Bidirectional integration utilities for running AngularJS and React side by side
- 🏗️ Component migration patterns and best practices
- 📚 Step-by-step migration guides and documentation
- 🎯 Real-world examples of migrated components
- 🧪 Testing strategies for hybrid applications
- 🔧 State management migration utilities
- 📊 Migration progress tracking tools

## Getting Started

### Installation

```bash
npm install ng-react-toolkit
```

### Basic Usage

```javascript
// Mount React component in AngularJS
import { wrapReactComponent } from 'ng-react-toolkit';
import MyReactComponent from './MyReactComponent';

angular.module('myApp')
  .directive('myComponent', wrapReactComponent(MyReactComponent));

// Mount AngularJS component in React
import { wrapAngularJsComponent } from 'ng-react-toolkit';

const WrappedAngularComponent = wrapAngularJsComponent('myAngularDirective');
```

## Documentation

### Migration Strategies

1. **Strangler Fig Pattern Implementation**
   - Gradually replace AngularJS components with React
   - Maintain existing functionality during migration
   - Track migration progress

2. **State Management Migration**
   - Converting `$scope` to React state
   - Integration with modern state management solutions
   - Handling legacy services

3. **Router Migration**
   - Hybrid routing setup
   - Path-by-path migration approach
   - URL handling between frameworks

### Example Implementations

The `/examples` directory contains real-world migration scenarios:

- Basic component migration
- Form handling
- Data fetching
- State management
- Route migration
- Testing strategies

## Project Structure

```
/src
  /core          - Core migration utilities
  /wrappers      - Framework wrapper implementations
  /state         - State management utilities
  /router        - Routing utilities
/examples        - Example implementations
/docs            - Detailed documentation
/tests          - Test suites
```

## Migration Guide

1. **Assessment Phase**
   - Audit current AngularJS application
   - Identify migration priorities
   - Plan migration strategy

2. **Setup Phase**
   - Install toolkit
   - Configure build system
   - Set up hybrid app structure

3. **Migration Phase**
   - Start with leaf components
   - Migrate shared services
   - Update routing gradually
   - Migrate state management

4. **Testing Strategy**
   - Unit testing migrated components
   - Integration testing hybrid scenarios
   - End-to-end testing

## Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

### Development Setup

```bash
git clone https://github.com/benzara-tahar/ng-react-toolkit.git
cd ng-react-toolkit
npm install
npm test
```

## Support

- 📖 [Documentation](docs/README.md)
- 💬 [Discussions](https://github.com/benzara-tahar/ng-react-toolkit/discussions)
- 🐛 [Issue Tracker](https://github.com/benzara-tahar/ng-react-toolkit/issues)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments


- [angular2react](https://github.com/coatue-oss/angular2react) - Coatue's library for converting AngularJS components to React
- [ngReact](https://github.com/ngReact/ngReact) - Use React Components in Angular Applications
- [ngx-zustand](https://github.com/Alfxjx/ngx-zustand) - Zustand implementation for ng
- [zustand-lit](https://github.com/ennjin/zustand-lit) - A zustand adapter for lit.js (LitElement)