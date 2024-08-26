import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PriorityQueueService } from './priority-queue.service';
import {
  HttpClient,
  HttpHeaders,
  HttpClientModule,
} from '@angular/common/http';

interface Task {
  TID: string;
  Task: string; // or use a more descriptive name like taskName
  DeadLine: string; // Make sure this matches your backend response
  Priority: string;
}

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule, CommonModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss',
})
export class TaskListComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private priorityQueue: PriorityQueueService
  ) {}
  task: Task[] = [];
  ngOnInit(): void {
    this.http
      .get<Task[]>('http://localhost:3001/getTask')
      .subscribe((data: Task[]) => {
        console.log('data=');

        data.forEach((task) => this.priorityQueue.enqueue(task));
        this.task = this.priorityQueue.getTasks();
        console.log(this.task[0]);
      });
  }

  task_ls: any[] = [];
  getTasks() {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http
      .get('http://localhost:3001/getTask', {
        headers,
      })
      .subscribe({
        next: (res) => {
          this.task_ls = res as any[];
        },
        error: (err) => {
          console.error('Error retrieving history:', err);
        },
      });
  }

  deleteTask(TID: string) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http
      .post(`http://localhost:3001/deleteTask/${TID}`, { headers })
      .subscribe({
        next: () => {
          // Remove the deleted task from the list
          this.task_ls = this.task_ls.filter((task) => task.TID !== TID);
          console.log('Task deleted successfully');
        },
        error: (err) => {
          console.error('Error deleting task:', err);
        },
      });
  }

  taskDone(TID: string) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http
      .post(`http://localhost:3001/taskDone/${TID}`, { headers })
      .subscribe({
        next: () => {
          this.task_ls = this.task_ls.filter((task) => task.TID !== TID);
          console.log('Task deleted successfully');
        },
        error: (err) => {
          console.error('Error deleting task:', err);
        },
      });
  }
}
