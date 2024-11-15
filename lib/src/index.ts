/**
 * Core Types
 */
export type {
  InjectToken,
  AngularJsCoreInjectTokens,
  TypedBinding
} from './types';

/**
 * Decorators
 */
export { Inject } from './decorators/inject';
export { connectStore } from './decorators/connect-store';
export { ConnectStoreDecorator  } from './decorators/connect-store.deprecated';


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