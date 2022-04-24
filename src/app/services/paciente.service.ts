import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {
  private URL='https://biodentis.herokuapp.com/messenger'
  constructor(private http:HttpClient, ) { }
  crearPaciente(paciente: any): Observable<any> {
    console.log(paciente)
    
    let headers = new HttpHeaders().set('Content-Type','application/json');
     
    return this.http.post(this.URL + '/crearPaciente', paciente, {headers: headers});
    
  }

  actualizarPaciente(paciente: any, id:any): Observable<any> {
    console.log(paciente);
    console.log(id);
    let headers = new HttpHeaders().set('Content-Type','application/json');
     
    return this.http.put(this.URL + '/cambioDatos/'+ id, paciente, {headers: headers});
    
  }

  crearHistoria(historia: any): Observable<any> {
    console.log(historia)
    
    let headers = new HttpHeaders().set('Content-Type','application/json');
     
    return this.http.post(this.URL + '/crearHistoria', historia, {headers: headers});
    
  }

  numHistorias(){

    let headers = new HttpHeaders().set('Content-Type','application/json');
     
    return this.http.get(this.URL + '/numhistorias', {headers: headers});

  }

  pacientes(page:number,num:number){
    let headers = new HttpHeaders().set('Content-Type','application/json');
     
    return this.http.get(this.URL + '/pacientepag/'+page+'/'+num, {headers: headers});
  }
  paciente(id:string){
    let headers = new HttpHeaders().set('Content-Type','application/json');
     
    return this.http.get(this.URL + '/paciente/'+id, {headers: headers});
  }

  buscarPaciente(namecedu:any): Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
     
    return this.http.post(this.URL + '/buscarPaciente',namecedu,{headers: headers});
  }


}
