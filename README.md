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
ionic g service services/tasks 
ionic g interface interfaces/task
````

````
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(),
    AppRoutingModule]
   ,
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
````


````
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
}


````

```
getAllTodos() {
  const path = `https://jsonplaceholder.typicode.com/todos`;
  return this.http.get<Task>(path);
}
```


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
    this.tasksService.getAllTask()
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