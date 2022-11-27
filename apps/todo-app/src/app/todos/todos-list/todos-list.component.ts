import { Component } from '@angular/core';
import { TodosService, TodoInterface, FilterEnum } from '@todo-workspace/todos';
import { Observable } from 'rxjs';
import {map, combineLatestWith} from 'rxjs/operators'

@Component({
  selector: 'todo-workspace-todos-list',
  templateUrl: './todos-list.component.html',
  styleUrls: ['./todos-list.component.scss'],
})
export class TodosListComponent {
  visibleTodos$!: Observable<TodoInterface[]>;
  noTodoClass$!: Observable<boolean>;
  isAllTodosSelected$!: Observable<boolean>;
  editingId: string | null = null;

  constructor(private todosService: TodosService) {
    this.checkIfNoTodos();
    this.checkIfAllTodosSelected();
    this.fetchTodos();
  }

  checkIfNoTodos() {
    this.noTodoClass$ = this.todosService
      .getTodos()
      .pipe(map((todos) => todos.length === 0));
  }

  checkIfAllTodosSelected() {
    this.isAllTodosSelected$ = this.todosService
      .getTodos()
      .pipe(map((todos) => todos.every((todo) => todo.isCompleted)));
  }

  // combine streams using combineLatestWith
  fetchTodos() {
    this.visibleTodos$ = this.todosService.getTodos().pipe(
      combineLatestWith(this.todosService.getFilter()),
      map(([todos, filter]: [TodoInterface[], FilterEnum]) => {
        if (filter === FilterEnum.active) {
          return todos.filter((todo) => !todo.isCompleted);
        } else if (filter === FilterEnum.completed) {
          return todos.filter((todo) => todo.isCompleted);
        } else {
          return todos;
        }
      })
    );
  }

  toggleAllTodos(event: Event) {
    const target = event.target as HTMLInputElement;
    this.todosService.toggleAll(target.checked);
  }

  setEditingId(editingId: string | null) {
    this.editingId = editingId;
  }
}
