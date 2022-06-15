import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { PostResponse, Post } from '../interfaces/interface';
import { AuthService } from './auth.service';


const URL = environment.url

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  paginaPost=0;
  newPost = new EventEmitter<Post>();

  constructor(private http:HttpClient,
              private auth:AuthService
  ) { }

  //get post from db
  getPost(pull:boolean=false){
    if(pull){//get page 1 when refresh page and new posts are loaded
      this.paginaPost = 0;
    }

    this.paginaPost ++;
    return this.http.get<PostResponse>(`${URL}/post/?page=${this.paginaPost}`);
  }

  //create new post
  createPost(post){

    const headers = new HttpHeaders({
      'x-token':this.auth.token
    });

    return new Promise(resolve=>{
      this.http.post(`${URL}/post/`,post,{headers})
        .subscribe(resp=>{
          this.newPost.emit(resp['post']);
          resolve(true);
        });
    });
  }


}
