import { Injectable } from '@angular/core';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UiServiceService {

  constructor( private alertController: AlertController,
               private toastController: ToastController,
               private loadingController: LoadingController
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

  async presentLoading(message:string) {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message,
      duration:2000
    });
    await loading.present();
  }
}
