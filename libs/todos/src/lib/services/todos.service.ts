import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FilterEnum } from '../model/filter.enum';
import { TodoInterface } from '../model/todo.interface';

@Injectable({
  providedIn: 'root'
})
export class TodosService {
  private todos$ = new BehaviorSubject<TodoInterface[]>([]);
  private filter$ = new BehaviorSubject<FilterEnum>(FilterEnum.all);

  getTodos() {
    return this.todos$.asObservable();
  }

  getFilter() {
    return this.filter$.asObservable();
  }

  addTodo(text: string) {
    const newTodo: TodoInterface = {
      id: Math.random().toString(16),
      text,
      isCompleted: false,
    };
    const updatedTodos = [...this.todos$.getValue(), newTodo];
    this.todos$.next(updatedTodos);
  }

  toggleAll(isCompleted: boolean) {
    const updatedTodos = this.todos$.getValue().map((todo) => {
      return {
        ...todo,
        isCompleted,
      };
    });
    this.todos$.next(updatedTodos);
  }

  changeFilter(filterName: FilterEnum) {
    this.filter$.next(filterName);
  }

  changeTodo(id: string, text: string) {
    const updatedTodos = this.todos$.getValue().map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          text: text,
        };
      }
      return todo;
    });
    this.todos$.next(updatedTodos);
  }

  removeTodo(id: string) {
    const updatedTodos = this.todos$
      .getValue()
      .filter((todo) => todo.id !== id);
    this.todos$.next(updatedTodos);
  }

  toggleTodo(id: string) {
    const updatedTodos = this.todos$.getValue().map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          isCompleted: !todo.isCompleted,
        };
      }
      return todo;
    });
    this.todos$.next(updatedTodos);
  }
}
