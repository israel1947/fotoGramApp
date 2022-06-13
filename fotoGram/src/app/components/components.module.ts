import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostComponent } from './post/post.component';
import { PostsComponent } from './posts/posts.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [
    PostComponent,
    PostsComponent
  ],
  imports: [
    IonicModule,
    CommonModule
  ],
  exports:[
    PostsComponent,
  ]
})
export class ComponentsModule { }
