import { Component } from '@angular/core';
import { TodosService } from '@todo-workspace/todos'

@Component({
  selector: 'todo-workspace-app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  text = '';

  constructor(private todoService: TodosService) {}

  changeText(event: Event) {
    const target = event.target as HTMLInputElement;
    this.text = target.value;
    if (this.text) {
      // console.log(this.text);
    }
  }

  addTodo() {
    if (this.text) {
      this.todoService.addTodo(this.text);
      this.text = '';
    }
  }
}
