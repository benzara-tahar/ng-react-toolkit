# AngularJS to React Migration Toolkit

A comprehensive toolkit and guide for incrementally migrating AngularJS (1.x) applications to modern React. This repository provides utilities, patterns, and real-world examples to help teams successfully transition their legacy AngularJS applications to React while maintaining production stability.

[![npm version](https://img.shields.io/npm/v/angularjs-to-react-migration-toolkit.svg)](https://www.npmjs.com/package/angularjs-to-react-migration-toolkit)
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
npm install angularjs-to-react-migration-toolkit
```

### Basic Usage

```javascript
// Mount React component in AngularJS
import { wrapReactComponent } from 'angularjs-to-react-migration-toolkit';
import MyReactComponent from './MyReactComponent';

angular.module('myApp')
  .directive('myComponent', wrapReactComponent(MyReactComponent));

// Mount AngularJS component in React
import { wrapAngularJsComponent } from 'angularjs-to-react-migration-toolkit';

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
git clone https://github.com/username/angularjs-to-react-migration-toolkit.git
cd angularjs-to-react-migration-toolkit
npm install
npm test
```

## Support

- 📖 [Documentation](docs/README.md)
- 💬 [Discussions](https://github.com/username/angularjs-to-react-migration-toolkit/discussions)
- 🐛 [Issue Tracker](https://github.com/username/angularjs-to-react-migration-toolkit/issues)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- AngularJS team for their years of maintaining AngularJS
- React team for their excellent documentation
- All contributors who have helped with examples and documentation