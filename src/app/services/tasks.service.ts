import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Task } from './../interfaces/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private api = 'https://jsonplaceholder.typicode.com';

  constructor(
    private http: HttpClient
  ) { }

  getAllTasks() {
    const path = `${this.api}/todos`;
    return this.http.get<Task[]>(path);
  }

  getTask(id: string) {
    const path = `${this.api}/todos/${id}`;
    return this.http.get<Task>(path);
  }

  updateTask(task: Task) {
    const path = `${this.api}/todos/${task.id}`;
    return this.http.put<Task>(path, task);
  }

  deleteTask(id: string) {
    const path = `${this.api}/todos/${id}`;
    return this.http.delete(path);
  }

  createTask(task: Task) {
    const path = `${this.api}/todos`;
    return this.http.post<Task>(path, task);
  }

}
