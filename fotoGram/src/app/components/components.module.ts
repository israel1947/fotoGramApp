import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostComponent } from './post/post.component';
import { PostsComponent } from './posts/posts.component';
import { IonicModule } from '@ionic/angular';
import { PipesModule } from '../pipes/pipes.module';
import { AvatarSelectComponent } from './avatar-select/avatar-select.component';
import { ModalEditPerfilComponent } from './modal-edit-perfil/modal-edit-perfil.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    PostComponent,
    PostsComponent,
    AvatarSelectComponent,
    ModalEditPerfilComponent
  ],
  imports: [
    IonicModule,
    CommonModule,
    PipesModule,
    FormsModule,
  ],
  exports:[
    PostsComponent,
    AvatarSelectComponent,
    ModalEditPerfilComponent
  ]
})
export class ComponentsModule { }
