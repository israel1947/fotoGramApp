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

  getPost(){
    this.paginaPost ++;
    return this.http.get<PostResponse>(`${URL}/post/?page=${this.paginaPost}`);
  }


}
