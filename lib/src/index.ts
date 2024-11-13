import angular from 'angular';
import { TestService } from './services/TestService';
import { Inject, Injectable } from './decorators/inject';
import { ConnectStore } from './decorators/connect-store';
import { useNgServices } from './hooks/use-ng-services';

export const ngReactToolkit = angular
  .module('ngReactToolkit', [])
  .service('testService', TestService)
  .name;


export {
  useNgServices,
  ConnectStore,
  TestService,
  type Inject,
  type Injectable
};