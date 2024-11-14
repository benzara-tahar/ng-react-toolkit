import 'angular'
import 'angular-mocks'
import * as angular from 'angular'

import { TestService } from "../services/TestService";

// TODO: fix angular-mock
describe('TestService', () => {
   let testService: TestService;
   let $q: ng.IQService;
   let $rootScope: ng.IRootScopeService;

   beforeEach(() => {
      angular.mock.module('ngReactToolkit');

      angular.mock.inject((_testService_: TestService, _$q_: ng.IQService, _$rootScope_: ng.IRootScopeService) => {
         testService = _testService_;
         $q = _$q_;
         $rootScope = _$rootScope_;
      });
   });

   it('should return a message', (done) => {
      testService.getMessage().then((message) => {
         expect(message).toBe('Hello from TestService!');
         done();
      });
      $rootScope.$apply(); // Trigger digest cycle
   });
});

describe('test', () => {
   it('shoud work', ()=> {
      expect(1).toBeTruthy();
   })
})