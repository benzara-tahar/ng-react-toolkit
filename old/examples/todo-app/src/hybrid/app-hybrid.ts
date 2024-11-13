import angular from 'angular';
import '../../core/ngReact';

import { TodoList } from './components/ToDoList';
import { TodoService } from '../full-angularjs/services/todo.service';

angular.module('hybridApp', ['ngReact'])
   .service('TodoService', TodoService)
   .value('ToDoListReact', TodoList);