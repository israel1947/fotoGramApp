import { Injectable } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UiServiceService {

  constructor( private alertController: AlertController,
               private toastController: ToastController,
  ) { }

  async alertInfo(message:string,header:string){
    const alert = await this.alertController.create({
      cssClass:'alert',
      header:header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }

  async presentToast(message:string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000
    });
    toast.present();
  }
}
