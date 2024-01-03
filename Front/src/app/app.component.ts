// app.component.ts
import { Component } from '@angular/core';
import { ToDoListComponent } from './to-do-list/to-do-list.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'my-todo-app';
}