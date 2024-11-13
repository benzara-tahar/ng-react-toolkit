import angular from 'angular';
import { TestService } from './services/TestService';

// Create the main module
export const ngReactToolkit = angular
  .module('ngReactToolkit', [])
  .service('testService', TestService)
  .name;

// Export services for TypeScript support
export { TestService };