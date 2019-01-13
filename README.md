````
<ion-content>
  <ion-list>
    <ion-item>
      <ion-label>Tarea 1</ion-label>
      <ion-checkbox checked></ion-checkbox>
    </ion-item>
    <ion-item>
      <ion-label>Tarea 2</ion-label>
      <ion-checkbox checked></ion-checkbox>
    </ion-item>
    <ion-item>
      <ion-label>Tarea 3</ion-label>
      <ion-checkbox checked></ion-checkbox>
    </ion-item>
  </ion-list>
</ion-content>
````

````
<ion-header>
  <ion-toolbar color="primary">
    <ion-title>
      Tareas
    </ion-title>
  </ion-toolbar>
</ion-header>
```

````
<ion-list>
  <ion-item>
    <ion-label>Tarea 1</ion-label>
    <ion-checkbox checked slot="end"></ion-checkbox>
  </ion-item>
  <ion-item>
    <ion-label>Tarea 2</ion-label>
    <ion-checkbox checked slot="end"></ion-checkbox>
  </ion-item>
  <ion-item>
    <ion-label>Tarea 3</ion-label>
    <ion-checkbox checked slot="end"></ion-checkbox>
  </ion-item>
</ion-list>
````

````
<ion-list>
  <ion-item>
    <ion-label>Tarea 1</ion-label>
    <ion-checkbox checked slot="start"></ion-checkbox>
  </ion-item>
  <ion-item>
    <ion-label>Tarea 2</ion-label>
    <ion-checkbox checked slot="start"></ion-checkbox>
  </ion-item>
  <ion-item>
    <ion-label>Tarea 3</ion-label>
    <ion-checkbox checked slot="start"></ion-checkbox>
  </ion-item>
</ion-list>
````



````
import { Component, OnInit } from '@angular/core';

import { TasksService } from './../services/tasks.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(
    private tasksService: TasksService,
  ) {}

  ngOnInit() {

  }

}
````

`````
ngOnInit() {
  this.getAllTask();
}

getAllTask() {
  this.taskService.getAllTasks()
  .subscribe(tasks => {
    this.tasks = tasks;
  });
}
````


````
<ion-list>
    <ion-item *ngFor="let task of tasks">
      <ion-label>{{ task.title }}</ion-label>
      <ion-checkbox [checked]="task.completed" slot="start"></ion-checkbox>
    </ion-item>
  </ion-list>
````


````
<ion-header>
  <ion-toolbar color="primary">
    <ion-title>
      Tareas
    </ion-title>
    <ion-buttons slot="end">
      <ion-icon slot="icon-only" name="add"></ion-icon>
    </ion-buttons>
  </ion-toolbar>
</ion-header>
````

````
async openAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Nueva tarea!',
      inputs: [
        {
          name: 'title',
          type: 'text',
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Crear',
          handler: () => {
            console.log('Confirm Ok');
          }
        }
      ]
    });
    await alert.present();
  }
```

````
createTask(title: string) {
    const task = {
      userId: '1',
      title,
      completed: true
    };
    this.taskService.createTask(task)
    .subscribe((newTask) => {
      this.tasks.unshift(newTask);
    });
  }
````

````
<ion-item-sliding *ngFor="let task of tasks; let index = i">
  <ion-item>
    <ion-label>{{ task.title }}</ion-label>
    <ion-checkbox [checked]="task.completed" slot="start"></ion-checkbox>
  </ion-item>
  <ion-item-options side="end">
    <ion-item-option color="danger">
      <ion-icon name="trash"></ion-icon>
    </ion-item-option>
  </ion-item-options>
</ion-item-sliding>
````

````
deleteTask(id: string, index: number) {
    this.taskService.deleteTask(id)
    .subscribe(() => {
      this.tasks.splice(index, 1);
    });
  }
```