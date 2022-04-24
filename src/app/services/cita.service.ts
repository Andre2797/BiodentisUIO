import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CitaService {
  private URL='https://biodentis.herokuapp.com/messenger'
  constructor(private http:HttpClient) { }

  listaCitas(){

    let headers = new HttpHeaders().set('Content-Type','application/json');
     
    return this.http.get(this.URL + '/reservas', {headers: headers});

  }

  listaSucu(){

    let headers = new HttpHeaders().set('Content-Type','application/json');
     
    return this.http.get(this.URL + '/sucursales', {headers: headers});

  }

  listaOdo(){

    let headers = new HttpHeaders().set('Content-Type','application/json');
     
    return this.http.get(this.URL + '/odos', {headers: headers});

  }
}
