import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizerPipe } from './dom-sanitizer.pipe';
import { ImageSanatizerPipe } from './image-sanatizer.pipe';
import { ImagenPipe } from './imagen.pipe';



@NgModule({
  declarations: [
    DomSanitizerPipe,
    ImageSanatizerPipe,
    ImagenPipe
  ],
  exports:[
    DomSanitizerPipe,
    ImageSanatizerPipe,
    ImagenPipe
  ]
})
export class PipesModule { }
