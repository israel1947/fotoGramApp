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
    this.http.post(`${URL}/user/login`,data)
      .subscribe(resp=>{
        console.log(resp);
      });
  }
}
