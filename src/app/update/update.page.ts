import { Component, OnInit } from '@angular/core';
import { TasksService } from '../services/tasks.service';
import { Task } from '../interfaces/task';
import { ActivatedRoute } from '@angular/router';
import { HomePage } from '../home/home.page';

@Component({
  selector: 'app-update',
  templateUrl: './update.page.html',
  styleUrls: ['./update.page.scss'],
})
export class UpdatePage implements OnInit {

  task: Task;
  content: object = null; 
  tasks =  HomePage["tasks"] = [];

  constructor(
    private taskService: TasksService, 
    private activateRoute: ActivatedRoute
    ) { }



  ngOnInit() {
    this.getTask();
  }

  getTask() {
    let id = this.activateRoute.snapshot.paramMap.get('id');
    this.taskService.getTask(id)
    .subscribe(taskU => {
      console.log('este es el task', taskU);
      this.content = taskU;
    });
  }

  updateTask(id: string){
    const task = {
      id,
      userId: '1',
      title: 'titulo cambiado',
      completed: false

    };
    this.taskService.updateTask(task)
    .subscribe(async (updateTask) => {
      console.log('array' + this.tasks);
      this.tasks.unshift(updateTask);
      console.log(this.tasks);
    });
  }

  }