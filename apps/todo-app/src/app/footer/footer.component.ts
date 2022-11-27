import { Component } from '@angular/core';
import { FilterEnum, TodosService } from '@todo-workspace/todos';
import { Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';

@Component({
  selector: 'todo-workspace-app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  noTodosClass$!: Observable<boolean>;
  activeCount$!: Observable<number>;
  itemsLeftText$!: Observable<string>;
  filter$!: Observable<FilterEnum>;
  filterEnum = FilterEnum;

  constructor(private todosService: TodosService) {
    this.checkIfNoTodos();
    this.checkActiveTodos();
    this.getItemsLeftText();
    this.filter$ = this.todosService.getFilter();
  }

  // check if no todos
  checkIfNoTodos() {
    this.noTodosClass$ = this.todosService.getTodos().pipe(
      map((todos) => todos.length === 0)
    );
  }

  // check active todos
  checkActiveTodos() {
    this.activeCount$ = this.todosService.getTodos().pipe(
      map((todos) => todos.filter((todo) => !todo.isCompleted).length)
    );
  }

  getItemsLeftText() {
    this.itemsLeftText$ = this.activeCount$.pipe(
      map((activeCount) => {
        let text = '';
        text = activeCount !== 1 ? 's' : '';
        return `item${text} left`;
      })
    );
  }

  changeFilter(event: Event, filterName: FilterEnum) {
    event.preventDefault();
    this.todosService.changeFilter(filterName);
  }
}
