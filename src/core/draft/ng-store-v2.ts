(function() {
   'use strict';
 
   angular.module('app.store', [])
     .factory('storeService', storeService);
 
   function storeService($rootScope) {
     function createStore(initialState) {
       var currentState = initialState;
       var listeners = [];
 
       function getState() {
         return angular.copy(currentState);
       }
 
       function setState(newState) {
         currentState = angular.copy(newState);
         notifyListeners();
       }
 
       function subscribe(listener) {
         listeners.push(listener);
         // Return unsubscribe function
         return function unsubscribe() {
           var index = listeners.indexOf(listener);
           if (index > -1) {
             listeners.splice(index, 1);
           }
         };
       }
 
       function notifyListeners() {
         $rootScope.$applyAsync(function() {
           listeners.forEach(function(listener) {
             listener(currentState);
           });
         });
       }
 
       return {
         getState: getState,
         setState: setState,
         subscribe: subscribe
       };
     }
 
     // Directive to bind store to scope
     angular.module('app.store').directive('connectStore', function() {
       return {
         restrict: 'A',
         scope: {
           selector: '&',
           store: '='
         },
         link: function(scope, element, attrs) {
           var unsubscribe = null;
           
           function updateScope(state) {
             var selectedState = scope.selector ? 
               scope.selector()(state) : 
               state;
             
             if (!angular.equals(scope.storeState, selectedState)) {
               scope.storeState = selectedState;
             }
           }
 
           scope.$watch('store', function(newStore) {
             if (unsubscribe) {
               unsubscribe();
             }
             
             if (newStore) {
               updateScope(newStore.getState());
               unsubscribe = newStore.subscribe(updateScope);
             }
           });
 
           scope.$on('$destroy', function() {
             if (unsubscribe) {
               unsubscribe();
             }
           });
         }
       };
     });
 
     return {
       createStore: createStore
     };
   }
 }());