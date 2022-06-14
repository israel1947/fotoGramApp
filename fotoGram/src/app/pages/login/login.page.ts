import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IonSlides, NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { UiServiceService } from 'src/app/services/ui-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  avatars = [
    {
      img: 'av-1.png',
      seleccionado: true
    },
    {
      img: 'av-2.png',
      seleccionado: false
    },
    {
      img: 'av-3.png',
      seleccionado: false
    },
    {
      img: 'av-4.png',
      seleccionado: false
    },
    {
      img: 'av-5.png',
      seleccionado: false
    },
    {
      img: 'av-6.png',
      seleccionado: false
    },
    {
      img: 'av-7.png',
      seleccionado: false
    },
    {
      img: 'av-8.png',
      seleccionado: false
    },
];

slidesOptions = {
  slidesPerView: 3.5,
  
};

loginUser={
  email:'correo@correo.com',
  password:'123456'
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

  onSelectAvatar(avatar){
    this.avatars.forEach(ava=>ava.seleccionado=false);
    avatar.seleccionado = true;
  }

  async login(fLogin:NgForm){
    if(fLogin.invalid){return; }
   const valid = await  this.auth.login(this.loginUser.email, this.loginUser.password);
   if(valid){
    //redirec to home page
    this.navCtrl.navigateRoot('/main/tabs/tab1',{animated:true});
    }else{
      //credentials incorrects alert
      this.uiService.alertInfo("User and password is incorrecte",'Incorrect Credentials');
    }
  }

  register(fRegister:NgForm){
    console.log(fRegister.valid);
  }

  image="https://www.fundacion-affinity.org/sites/default/files/los-10-sonidos-principales-del-perro.jpg";

}
