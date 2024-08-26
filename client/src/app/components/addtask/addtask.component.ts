import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-addtask',
  standalone: true,
  imports: [FormsModule, HttpClientModule],
  templateUrl: './addtask.component.html',
  styleUrls: ['./addtask.component.scss'], // Fixed to 'styleUrls'
})
export class AddtaskComponent implements OnInit {
  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    console.log('Component Initialized');
  }

  public addTask(formData: any) {
    // Capturing the form data
    const data = {
      task: formData.task,
      priority: formData.priority,
      date: formData.date,
    };

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http
      .post('http://localhost:3001/addTask', data, { headers })
      .subscribe((res) => {
        alert('task added!');
        this.router.navigate(['/tasklist']);
      });
  }
}
