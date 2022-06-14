import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { environment } from 'src/environments/environment';

const URL = environment.url

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  token:string=null;
  constructor( private http:HttpClient,
               private storage: Storage,
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

  async saveToken(token:string){
    this.token = token;
    //save token in the storage
    const storage = await this.storage.create();
    await this.storage.set('token',token);
  }


}
