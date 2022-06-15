import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { promise } from 'protractor';
import { environment } from 'src/environments/environment';
import { User } from '../interfaces/interface';

const URL = environment.url

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  token:string=null;
  private user:User={}

  constructor( private http:HttpClient,
               private storage: Storage,
               private navCtrl:NavController,
  ) { }

  login(email:string,password:string){
    const data = {email,password};
    return new Promise((resolve) => {
      
      this.http.post(`${URL}/user/login`,data)
        .subscribe(async resp=>{
          if(resp['ok']){
            this.saveToken(resp['token']);
            resolve(true);
          }else{
            //delete token in case that user or password is incorrecte
            const storage = await this.storage.create();
            this.token=null;
            this.storage.clear();
            resolve(false);
          }
       });
    })
  }

  register(user:User){
    return new Promise(resolve => {
      this.http.post(`${URL}/user/create`,user)
        .subscribe(async resp=>{
          console.log(resp);
          if(resp['ok']){
            this.saveToken(resp['token']);
            resolve(true);
          }else{
            const storage = await this.storage.create();
            this.token=null;
            this.storage.clear();
            resolve(false);
          }
          
        });
    });
  }

  //get user information
  getUser(){
    if(!this.user._id){
      this.validateToken();
    }
    return {...this.user};
  }

  async saveToken(token:string){
    this.token = token;
    //save token in the storage
    const storage = await this.storage.create();
    await this.storage.set('token',token);
  }

  //load token from storage
  async loadToken(){
    const storage = await this.storage.create();
    this.token = await this.storage.get('token') || null;
  }

  //validate token is correct
  async validateToken(){
    await this.loadToken();
    //if token not exist
    if(!this.token){
      this.navCtrl.navigateRoot('/login');
      return Promise.resolve(false);
    }
    //if token exist
    return new Promise<boolean>((resolve) => {
      const headers = new HttpHeaders({
        'x-token':this.token
      });
      this.http.get(`${URL}/user/`,{headers})
        .subscribe(resp=>{
          //token valid
          if(resp['ok']){
            this.user = resp['user'];
            resolve(true);
          }else{
            //token invalid
            resolve(false);
            this.navCtrl.navigateRoot('/login');
          }
       });
    });
  }


}
