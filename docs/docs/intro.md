---
sidebar_position: 1
---

# Getting started

Modernize your AngularJS applications with React, **seamlessly and incrementally**. ng-react-toolkit provides a set of primitives and opinionated recipes to help you migrate your legacy AngularJS applications to React without a complete rewrite.

## Why ng-react-toolkit?

- 🔄 **Incremental Migration**: Migrate component by component while keeping your application functional
- 🛠 **Rich Primitives**: Ready-to-use tools for common migration patterns
- 📚 **Best Practices**: Opinionated recipes based on real-world migration experiences
- 🔌 **Seamless Integration**: Smooth interoperability between AngularJS and React components

## Getting Started

### Prerequisites

- Existing AngularJS application (1.x)
- [Node.js](https://nodejs.org/en/download/) version 16.0 or above
- npm or yarn package manager

### Installation

Add ng-react-toolkit to your existing AngularJS project:

```bash
# Using npm
npm install ng-react-toolkit

# Using yarn
yarn add ng-react-toolkit
```

### Basic Setup

1. First, configure ng-react-toolkit in your AngularJS module:

```javascript
import  'ng-react-toolkit';
import angular from 'angular';

angular.module('yourApp', ['ng-react-toolkit']);
```

2. Start using React components in your AngularJS templates:

```html
<react-component 
  component="YourReactComponent"
  props="{ message: 'Hello from React!' }">
</react-component>
```

## Core Concepts

ng-react-toolkit is built around several core concepts:

1. **Component Bridge**: Seamlessly render React components within AngularJS templates
2. **State Management**: Bridge between AngularJS scope and React state/props
3. **Lifecycle Hooks**: Properly handle component lifecycle across both frameworks
4. **Event Handling**: Bidirectional event communication between AngularJS and React

## Next Steps

- Explore our [Component Migration Guide](./component-migration.md) for detailed migration strategies

## Community and Support

- 📦 [GitHub Repository](https://github.com/benzara-tahar/ng-react-toolkit)


The documentation will continue to grow with more examples, best practices, and community contributions. Start your migration journey today with ng-react-toolkit!