import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PostsService } from '../../services/posts.service';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import { Camera,CameraOptions } from '@awesome-cordova-plugins/camera/ngx';

declare var window:any;
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {


  tempImages:string[]=[];
  geoLocationSpiner:boolean=false;

  post={
    message:'',
    coords:null,
    potition:false
  };
  
  constructor( private postService:PostsService,
               private router:Router,
               private geolocation:Geolocation,
               private camera:Camera,
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

  getLocation(){
    if(!this.post.potition){
      this.post.coords=null;
      return;
    }
    this.geoLocationSpiner=true;

    this.geolocation.getCurrentPosition().then((resp) => {
      
      this.geoLocationSpiner=false;
      //get geo location
      const coords = `${resp.coords.latitude},${resp.coords.longitude}`;
      //push coords into post.coords
      this.post.coords = coords;
     }).catch((error) => {
       console.log('Error getting location', error);
       this.geoLocationSpiner=false;
     });
  }

  takePicture(){
    const options: CameraOptions = {
      quality: 60,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation:true,
      sourceType:this.camera.PictureSourceType.CAMERA
    }
    
    this.camera.getPicture(options).then((imageData) => {
     const img = window.Ionic.WebView.convertFileSrc(imageData);
     console.log(img);

     this.tempImages.push(img);
     
    }, (err) => {
     // Handle error
    });
  }
}
 