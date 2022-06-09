import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';


const URL = environment.url

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  paginaPost=0;

  constructor(private http:HttpClient) { }

  getPost(){
    this.paginaPost ++;
    return this.http.get(`${URL}/post/?page=${this.paginaPost}`);
  }


}
