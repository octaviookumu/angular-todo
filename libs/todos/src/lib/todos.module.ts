import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodosService } from './services/todos.service';

@NgModule({
  imports: [CommonModule],
  providers: [TodosService]
})
export class TodosModule {}
