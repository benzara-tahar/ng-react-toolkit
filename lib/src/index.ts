/**
 * Core Types
 */
export type {
  InjectToken,
  AngularJsCoreInjectTokens
} from './types';

/**
 * Decorators
 */
export { Inject } from './decorators/inject';
export { ConnectStore } from './decorators/connect-store';


/**
 * Hooks
 */
export {
  useNgServices
} from './hooks/use-ng-services';

/**
 * Services
 */
export { TestService } from './services/TestService';


/**
 * Angular Modules
 */
import angular from 'angular';
import { TestService } from './services/TestService';

export const ngReactToolkit = angular
  .module('ngReactToolkit', [])
  .service('testService', TestService)
  .name;

  export { default as ngReact } from './bridge/ngReact';