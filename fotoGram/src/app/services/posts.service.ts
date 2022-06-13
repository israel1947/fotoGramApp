import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { PostResponse } from '../interfaces/interface';


const URL = environment.url

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  paginaPost=0;

  constructor(private http:HttpClient) { }

  getPost(pull:boolean=false){
    if(pull){//get page 1 when refresh page and new posts are loaded
      this.paginaPost = 0;
    }

    this.paginaPost ++;
    return this.http.get<PostResponse>(`${URL}/post/?page=${this.paginaPost}`);
  }


}
