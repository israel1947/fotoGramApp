import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { User } from 'src/app/interfaces/interface';
import { AuthService } from '../../services/auth.service';
import { NgForm } from '@angular/forms';
import { UiServiceService } from '../../services/ui-service.service';

@Component({
  selector: 'app-modal-edit-perfil',
  templateUrl: './modal-edit-perfil.component.html',
  styleUrls: ['./modal-edit-perfil.component.scss'],
})
export class ModalEditPerfilComponent implements OnInit {

  img1="/assets/perro-1.jpg"

  user:User={};
  
  constructor( private modalCtrl: ModalController,
               private auth:AuthService,
               private uiToast:UiServiceService,
) { }

  ngOnInit() {
    this.user = this.auth.getUser();
    console.log(this.user);
  }

  closeModal( ){
    this.modalCtrl.dismiss();
  }

 async  updateUserInformation(fUpdate:NgForm){
    if(fUpdate.invalid){
      return;
    }
    const updated = await this.auth.updateUser(this.user);
    console.log(updated);
  
    if(updated){
      //User information update with successful
      this.uiToast.presentToast('Your information has been updated.');
    }else{
      //User information update unsuccessful
      this.uiToast.presentToast('Your information could not be updated.');
    }
  }

}
