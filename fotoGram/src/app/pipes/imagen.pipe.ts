import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';


const URL = environment.url

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(image:string, userId:string): string {
    return `${URL}/post/imagen/${userId}/${image}`;
  }

}
