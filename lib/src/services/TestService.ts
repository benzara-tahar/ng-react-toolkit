export class TestService {
   static $inject = ['$q'];
   
   constructor(private $q: ng.IQService) {}
   
   getMessage(): ng.IPromise<string> {
     return this.$q.resolve('Hello from TestService!');
   }
 }