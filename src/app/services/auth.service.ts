import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http'
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private URL='https://biodentis.herokuapp.com/messenger'
 
 
  constructor(private http:HttpClient, 
    ) {
    
   }

  login(user: any): Observable<any> {
    console.log(user)
    //let json = JSON.stringify(user);
    //let params = "json="+json;
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this.http.post(this.URL + '/login', user, {headers: headers});
    
  }

  userBlock(correo:any){
    console.log(correo);
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this.http.put(this.URL + '/cambioEstado', correo, {headers: headers});

  }

  loggedIn(){
    if(localStorage.getItem('token')){
      return true
    }else{
      return false
    }
  }

  logout(){
    localStorage.removeItem('token');
    localStorage.clear();
  }
}
