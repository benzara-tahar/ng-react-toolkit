# ng-react-toolkit

A toolkit for using React components in AngularJS applications.

## Installation

```bash
npm install ng-react-toolkit
```

import { ngReactToolkit } from 'ng-react-toolkit';

angular.module('yourApp', ['ngReactToolkit'])



4. Publishing steps:

```bash
# Go to your lib directory
cd lib

# Login to npm (if you haven't already)
npm login

# Before publishing for the first time, you can check what will be published
npm pack --dry-run

# Build and publish
npm publish

# If it's a scoped package (@yourscope/package-name)
npm publish --access public