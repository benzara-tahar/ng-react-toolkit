import angular from 'angular';
import { TodoList } from './components/ToDoList';
import { TodoService } from './services/todo.service';
import { AddToDoForm } from './components/AddToDoForm';
import { TodoManagerComponent } from './components/todo-manager/todo-manager.component';
import { TodoSummaryComponent } from './components/todo-summary/todo-summary.component';

angular.module('hybridApp', ['ngReact'])
   // angular js services
   .service('TodoService', TodoService)
   // angular components
   .component('todoManager', new TodoManagerComponent())
   .component('todoSummary', new TodoSummaryComponent())
   // react components
   .value('ToDoList', TodoList)
   .value('AddToDoForm', AddToDoForm);