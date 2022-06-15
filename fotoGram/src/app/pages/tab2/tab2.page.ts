import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PostsService } from '../../services/posts.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {


  tempImages:string[]=[];

  post={
    message:'',
    coords:null,
    potition:false
  };
  
  constructor( private postService:PostsService,
               private router:Router,
  ) {}

  async createPost(){
    console.log(this.post);
    const created = await this.postService.createPost(this.post);

    //move the user to the home page and clear the create post tab
    this.post = {
      message:'',
      coords:null,
      potition:false
    }
    this.router.navigateByUrl('/main/tabs/tab1');
  }
}
 