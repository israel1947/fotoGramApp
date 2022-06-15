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
  infiniteScorllEnabled:boolean=true;

  constructor( private postService:PostsService) {}

  ngOnInit(): void {
    this.loadMorePosts();

    this.postService.newPost.subscribe(post=>{
      this.posts.unshift(post);
    });
  };

  RefreshPosts(event){
    this.loadMorePosts(event, true);
    //if there are new posts the previous ones are deleted, and it will show the new ones
    this.infiniteScorllEnabled = true;
    this.posts=[];
  }
  
  loadMorePosts(event?, pull:boolean=false){
    this.postService.getPost(pull)
      .subscribe(resp =>{
        this.posts.push(...resp.posts);
        if(event){
          event.target.complete();
          //finish de process of infinite scrool
         if(resp.posts.length === 0){
          this.infiniteScorllEnabled = false;
        }
      }
        console.log(resp);   
    });
  }

}
