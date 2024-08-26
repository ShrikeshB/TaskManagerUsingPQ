import { Routes } from '@angular/router';
import { AddtaskComponent } from './components/addtask/addtask.component';
import { TaskListComponent } from './components/task-list/task-list.component';

export const routes: Routes = [
  { path: '', redirectTo: '/tasklist', pathMatch: 'full' },
  { path: 'addtask', component: AddtaskComponent },
  { path: 'tasklist', component: TaskListComponent },
];
