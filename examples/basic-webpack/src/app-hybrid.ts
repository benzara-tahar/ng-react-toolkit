import angular from 'angular';

import { TodoList } from './components/ToDoList';

angular.module('hybridApp', ['ngReact'])
   // .service('TodoService', TodoService)
   .value('ToDoListReact', TodoList);