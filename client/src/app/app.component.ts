import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AddtaskComponent } from './components/addtask/addtask.component';
import {
  HttpClient,
  HttpHeaders,
  HttpClientModule,
} from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AddtaskComponent, HttpClientModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'client';

  constructor(private http: HttpClient) {}
  ngOnInit(): void {
    this.getTasks();
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
}
