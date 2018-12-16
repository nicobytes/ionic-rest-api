import { Component, OnInit } from '@angular/core';

import { TasksService } from './../services/tasks.service';
import { Task } from './../interfaces/task';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  tasks: Task[] = [];

  constructor(
    private tasksService: TasksService,
  ) {}

  ngOnInit() {
    this.getAllTask();
  }

  getAllTask() {
    this.tasksService.getAllTask()
    .subscribe(tasks => {
      this.tasks = tasks;
    });
  }


}
