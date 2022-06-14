import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostComponent } from './post/post.component';
import { PostsComponent } from './posts/posts.component';
import { IonicModule } from '@ionic/angular';
import { PipesModule } from '../pipes/pipes.module';
import { AvatarSelectComponent } from './avatar-select/avatar-select.component';



@NgModule({
  declarations: [
    PostComponent,
    PostsComponent,
    AvatarSelectComponent
  ],
  imports: [
    IonicModule,
    CommonModule,
    PipesModule
  ],
  exports:[
    PostsComponent,
    AvatarSelectComponent
  ]
})
export class ComponentsModule { }
