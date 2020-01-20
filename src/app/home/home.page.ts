import { Component, OnInit } from '@angular/core';

import { AlertController, ToastController, LoadingController } from '@ionic/angular';

import { TasksService } from './../services/tasks.service';
import { Task } from './../interfaces/task';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  tasks: Task[] = [];
  task: Task;

  constructor(
    private tasksService: TasksService,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController
  ) {}

  async ngOnInit() {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando..',
    });
    await loading.present();
    this.tasksService.getAllTasks()
    .subscribe(async (tasks) => {
      console.log(tasks);
      this.tasks = tasks;
      await loading.dismiss();
    });
  }

  async openAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Nueva tarea!',
      inputs: [
        {
          name: 'title',
          type: 'text',
          placeholder: 'aqui la tarea'
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
          handler: (data) => {
            this.createTask(data.title);
          }
        }
      ]
    });
    await alert.present();
  }

  createTask(title: string) {
    const task = {
      userId: '1',
      title,
      completed: true
    };
    this.tasksService.createTask(task)
    .subscribe((newTask) => {
      this.tasks.unshift(newTask);
    });
  }

  deleteTask(id: string, index: number) {
    this.tasksService.deleteTask(id)
    .subscribe(() => {
      this.tasks.splice(index, 1);
      this.presentToast('Su tarea fue eliminada correctamente');
    });
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 3000
    });
    await toast.present();
  }

  async presentLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando..',
      duration: 2000
    });
    await loading.present();
    return loading;
  }

  getTask(id: string) {
    this.tasksService.getTask(id)
      .subscribe(async task => {
        console.log('primer task ' + task.title); 
        this.task = task;
      });
  }

  updateTask(id: string, userId: string, title: string) {
    this.task = {
      userId,
      id,
      title,
      completed: false
    };
    this.tasksService.updateTask(this.task)
      .subscribe(async (updateTask) => {
        this.tasks.splice((parseInt(id)-1), 1, updateTask);
        console.log(this.tasks);
      });
  }

  async editAlert(id: string) {
    this.tasksService.getTask(id)
      .subscribe(async task => { 
        this.task = task;
        const alert = await this.alertCtrl.create({
          header: 'Editar tarea!',
          //subHeader: 'edit', //message: 'editer',          
          inputs: [
            {
              name: 'id',
              type: 'text',
              placeholder: 'id',
              value: 'Task id ' + this.task.id,
              disabled: true
    
            }, {
              label: 'title',
              name: 'title',
              type: 'text',
              placeholder: 'aqui texto',
              value: this.task.title
    
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
              text: 'editar',
              handler: (data) => {
                this.updateTask(this.task.userId, this.task.id, data.title);
                console.log(data);
              }
            }
          ]
        });
        await alert.present();
      });

  }


}
