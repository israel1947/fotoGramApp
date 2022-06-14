import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UiServiceService {

  constructor(public alertController: AlertController) { }

  async alertInfo(message:string,header:string){
    const alert = await this.alertController.create({
      cssClass:'alert',
      header:header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }
}
