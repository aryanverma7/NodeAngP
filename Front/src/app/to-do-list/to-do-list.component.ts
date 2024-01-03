// to-do-list.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedService } from '../shared.service';
import { Task } from '../shared.service';

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.css'],
})
export class ToDoListComponent implements OnInit {
  tasks: Task[] = [];
  completedTasks: number = 0;
  taskForm: FormGroup;

  constructor(private fb: FormBuilder, private sharedService: SharedService) {
    this.taskForm = this.fb.group({
      newTask: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    // Fetch tasks from the backend when the component initializes
    this.fetchTasks();
  }

  fetchTasks(): void {
    this.sharedService.getTasks().subscribe((tasks) => {
      this.tasks = tasks;
    });
  }

  addTask(): void {
    const newTask = this.taskForm.get('newTask')?.value;
    if (newTask) {
      // Send the new task to the backend
      this.sharedService.addTask(newTask).subscribe(() => {
        // If the task is successfully added to the backend, update the local tasks
        this.tasks.push(newTask);
        this.taskForm.reset();
      });
    }
  }

  removeTask(index: number): void {
    const taskToRemove = this.tasks[index];
    const taskId = taskToRemove._id;
    // Remove the task from the backend
    this.sharedService.deleteTask(taskId).subscribe(() => {
      // If the task is successfully removed from the backend, update the local tasks
      this.tasks.splice(index, 1);
    });
  }

  completeTask(index: number): void {
    const taskToComplete = this.tasks[index];
    const taskId = taskToComplete._id;
    // Implement logic for marking a task as completed on the backend
    this.sharedService.completeTask(taskId).subscribe(() => {
      // If the task is successfully marked as completed on the backend, update the local tasks
      this.completedTasks++;
      this.removeTask(index);
    });
  }
}
