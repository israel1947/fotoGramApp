import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/interfaces/interface';
import { PostsService } from '../../services/posts.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  posts:Post[]=[];

  constructor( private postService:PostsService) {}

  ngOnInit(): void {
    this.loadMorePosts();
  };
  

  loadMorePosts(event?){
    this.postService.getPost()
      .subscribe(resp =>{
        this.posts.push(...resp.posts);
        if(event){
          event.target.complete();
          //finish de process of infinite scrool
         if(resp.posts.length === 0){
          event.target.disabled=true
        }
      }
        console.log(resp);   
    });
  }

}
