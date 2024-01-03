// shared.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  // Tasks
  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.baseUrl}/tasks`);
  }

  addTask(newTask: Task): Observable<Task> {
    return this.http.post<Task>(`${this.baseUrl}/tasks`, newTask);
  }

  completeTask(taskId: string): Observable<Task> {
    const url = `${this.baseUrl}/${taskId}/complete`;
    return this.http.patch<Task>(url, {}); // Using HTTP PATCH for completeness
  }

  updateTask(taskId: string, updatedTask: Task): Observable<Task> {
    return this.http.put<Task>(`${this.baseUrl}/tasks/${taskId}`, updatedTask);
  }

  deleteTask(taskId: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/tasks/${taskId}`);
  }

  // Shopping Items
  getShoppingItems(): Observable<ShoppingItem[]> {
    return this.http.get<ShoppingItem[]>(`${this.baseUrl}/shopping-items`);
  }

  addShoppingItem(newItem: ShoppingItem): Observable<ShoppingItem> {
    return this.http.post<ShoppingItem>(`${this.baseUrl}/shopping-items`, newItem);
  }

  updateShoppingItem(itemId: string, updatedItem: ShoppingItem): Observable<ShoppingItem> {
    return this.http.put<ShoppingItem>(`${this.baseUrl}/shopping-items/${itemId}`, updatedItem);
  }

  deleteShoppingItem(itemId: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/shopping-items/${itemId}`);
  }

  // // API Integration
  // getApiData(): Observable<ApiData> {
  //   return this.http.get<ApiData>('YOUR_API_ENDPOINT');
  // }
}

export interface Task {
  _id: string;
  title: string;
  completed: boolean;
}

interface ShoppingItem {
  _id: string;
  name: string;
  price: number;
  color?: string;
}

// interface ApiData {
//   // Define the structure of your API response data here
//   // Example: title: string;
// }
