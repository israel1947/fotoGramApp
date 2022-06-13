import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'domSanitizer'
})
export class DomSanitizerPipe implements PipeTransform {

  constructor( private domSanatizer: DomSanitizer){}

  transform(img:string): unknown {
    const domImg = `background-image:url('${img}')`;
    return this.domSanatizer.bypassSecurityTrustStyle(domImg);
  }

}
