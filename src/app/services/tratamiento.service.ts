import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TratamientoService {
  private URL='https://biodentis.herokuapp.com/messenger'
  constructor(private http:HttpClient, ) { }
  dianosticvos(id:String){
    console.log(id)
    let headers = new HttpHeaders().set('Content-Type','application/json');
     
    return this.http.get(this.URL + '/diagnosticosOdont/'+id, {headers: headers});
  }

  crearTratamiento(trattamiento: any): Observable<any> {
    console.log(trattamiento)
    
    let headers = new HttpHeaders().set('Content-Type','application/json');
     
    return this.http.post(this.URL + '/crearTratamiento', trattamiento, {headers: headers});
    
  }

  crearSeguimiento (seguimiento: any): Observable<any> {
    console.log(seguimiento)
    
    let headers = new HttpHeaders().set('Content-Type','application/json');
     
    return this.http.post(this.URL + '/crearSeguimiento', seguimiento, {headers: headers});
    
  }

   segumineto(id: string): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type','application/json');
       
    return this.http.get(this.URL + '/verSeguimiento/'+id, {headers: headers});
  }

  actualizarSeguimiento(seguimiento: any, id:any): Observable<any> {
    console.log(seguimiento);
    console.log(id);
    let headers = new HttpHeaders().set('Content-Type','application/json');
     
    return this.http.put(this.URL + '/cambioDatosSeguimiento/'+ id, seguimiento, {headers: headers});
    
  }

  actualizarTratamiento(tratamiento: any, id:any): Observable<any> {
    console.log(tratamiento);
    console.log(id);
    let headers = new HttpHeaders().set('Content-Type','application/json');
     
    return this.http.put(this.URL + '/actualizarTratamiento/'+ id, tratamiento, {headers: headers});
    
  }



}
