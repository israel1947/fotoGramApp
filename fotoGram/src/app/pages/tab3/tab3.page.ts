import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalEditPerfilComponent } from '../../components/modal-edit-perfil/modal-edit-perfil.component';
import { Post } from '../../interfaces/interface';
import { AuthService } from '../../services/auth.service';
import { PostsService } from '../../services/posts.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  img1="/assets/perro-1.jpg"
  postImg:Post[]


  constructor( private modalCtrl: ModalController, 
               private auth:AuthService,
               private postService:PostsService,
  ) {}

  ngOnInit(): void {
    this.postService.getPost()
      .subscribe(resp=>{
        this.postImg = resp.posts
        console.log(resp);
      });
      
  }

  logout(){
    this.postService.paginaPost=0;
    this.auth.logout();
    
  }

  async editPerfil(id){
    const modal = await this.modalCtrl.create({
      component:ModalEditPerfilComponent,
      componentProps:{
        id,
      }
    })
    modal.present();
  }

  


}
