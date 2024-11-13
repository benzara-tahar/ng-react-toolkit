import angular from 'angular';
import { TodoService } from "./services/todo.service";
import { TodoListComponent } from './todos/todos.component';

angular.module('fullAngularjsApp', [])
.component('todoList', new TodoListComponent())
.service('TodoService', TodoService);