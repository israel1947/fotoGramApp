import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizerPipe } from './dom-sanitizer.pipe';
import { ImageSanatizerPipe } from './image-sanatizer.pipe';



@NgModule({
  declarations: [
    DomSanitizerPipe,
    ImageSanatizerPipe
  ],
  exports:[
    DomSanitizerPipe,
    ImageSanatizerPipe
  ]
})
export class PipesModule { }
