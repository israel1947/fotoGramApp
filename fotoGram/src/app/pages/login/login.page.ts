import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IonSlides } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

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

  login(fLogin:NgForm){
    if(fLogin.invalid){return; }
    this.auth.login(this.loginUser.email, this.loginUser.password)
    console.log(fLogin.valid);
    console.log(fLogin.value);
    
  }

  register(fRegister:NgForm){
    console.log(fRegister.valid);
  }

}
