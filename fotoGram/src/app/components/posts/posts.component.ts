import { Component, OnInit, Input } from '@angular/core';
import { Post } from 'src/app/interfaces/interface';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit {


  @Input() posts:Post[]=[];

  constructor() { }

  ngOnInit() {
    //console.log("console de posts",this.posts); 
  }

}
