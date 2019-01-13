import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';

import { TaskService } from './../services/tasks.service';
import { Task } from './../interfaces/task';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  tasks: Task[] = [];

  constructor(
    private taskService: TaskService,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController
  ) {}

  ngOnInit() {
    this.getAllTask();
  }

  getAllTask() {
    this.taskService.getAllTasks()
    .subscribe(tasks => {
      this.tasks = tasks;
    });
  }

  async openAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Nueva tarea!',
      inputs: [
        {
          name: 'title',
          type: 'text',
          placeholder: 'Escriba la tarea'
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
    this.taskService.createTask(task)
    .subscribe((newTask) => {
      this.tasks.unshift(newTask);
    });
  }

  deleteTask(id: string, index: number) {
    this.taskService.deleteTask(id)
    .subscribe(() => {
      this.tasks.splice(index, 1);
      this.presentToast('La tarea fue eliminada.');
    });
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000
    });
    toast.present();
  }


}
