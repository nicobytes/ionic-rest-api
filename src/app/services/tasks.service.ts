import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Task } from './../interfaces/task';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor(
    private http: HttpClient
  ) { }

  getAllTask() {
    const path = `https://jsonplaceholder.typicode.com/todos`;
    return this.http.get<Task[]>(path);
  }
}
