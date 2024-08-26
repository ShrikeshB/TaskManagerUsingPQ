import { Injectable } from '@angular/core';

interface Task {
  TID: string;
  Task: string;
  DeadLine: string;
  Priority: string;
}

@Injectable({
  providedIn: 'root',
})
export class PriorityQueueService {
  private queue: Task[] = [];

  enqueue(task: Task) {
    this.queue.push(task);
    
    this.queue.sort((a, b) => {
      const priorityMap: { [key: string]: number } = {
        'low': 0,
        'medium': 1,
        'high': 2
      };
  
      return (priorityMap[b.Priority as keyof typeof priorityMap] || 0) - 
             (priorityMap[a.Priority as keyof typeof priorityMap] || 0);
    });
  }
  

  dequeue(): Task | undefined {
    return this.queue.shift();
  }

  getTasks(): Task[] {
    return this.queue;
  }
}
