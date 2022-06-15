import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { User } from 'src/app/interfaces/interface';
import { AuthService } from '../../services/auth.service';

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
) { }

  ngOnInit() {
    this.user = this.auth.getUser();
    console.log(this.user);
  }

  closeModal( ){
    this.modalCtrl.dismiss();
  }

  updateUserInformation(){
    
  }

}
