import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IonSlides, NavController } from '@ionic/angular';
import { User } from 'src/app/interfaces/interface';
import { AuthService } from 'src/app/services/auth.service';
import { UiServiceService } from 'src/app/services/ui-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  image="/assets/socialmedia.png";
  
  registerUser:User={
    nombre:'',
    email:'',
    password:'',
    avatar:''
  }

  loginUser={
    email:'',
    password:''
  }

@ViewChild('slidePrincipal') slides:IonSlides;

  constructor( private auth:AuthService,
               private navCtrl:NavController,
               private uiService:UiServiceService,
  ) { }

   ngAfterViewInit() {
    this.slides.lockSwipes(true)
  }  
  
  ngOnInit() {}

  swipeNext(){
    this.slides.lockSwipes(false);
    this.slides.slideNext();
    this.slides.lockSwipes(true);
  }
  swipePrev(){
    this.slides.lockSwipes(false);
    this.slides.slidePrev();
    this.slides.lockSwipes(true);

  }


  async login(fLogin:NgForm){
    if(fLogin.invalid){return; }
      const valid = await  this.auth.login(this.loginUser.email, this.loginUser.password);
      this.uiService.presentLoading('Logging in...');
   if(valid){
    //redirec to home page
      this.navCtrl.navigateRoot('/main/tabs/tab1',{animated:true});
    }else{
      //credentials incorrects alert
      this.uiService.alertInfo("User and password is incorrecte",'Incorrect Credentials');
    }
  }

  async register(fRegister:NgForm){
    if(fRegister.invalid){return;}
    const valid =  await this.auth.register(this.registerUser);
    this.uiService.presentLoading('Registering user...');
    if(valid){
      this.navCtrl.navigateRoot('/main/tabs/tab1',{animated:true});
    }else{
      this.uiService.alertInfo('Please verify that the data entered is correct','Incorects Data');
    }
    //console.log(fRegister.valid);
  }



}
