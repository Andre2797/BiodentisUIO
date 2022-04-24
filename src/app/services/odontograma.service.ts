import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OdontogramaService {

  

  private URL='https://biodentis.herokuapp.com/messenger'
  constructor(private http:HttpClient, ) { }
  crearOdontograma (odontograma: any): Observable<any> {
    console.log(odontograma)
    
    let headers = new HttpHeaders().set('Content-Type','application/json');
     
    return this.http.post(this.URL + '/crearOdontograma', odontograma, {headers: headers});
    
  }

  crearDiagnostico(odontograma: any): Observable<any> {
    console.log(odontograma)
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this.http.post(this.URL + '/crearDiagnostico', odontograma, {headers: headers});
  }

diagnotico(id: string): Observable<any> {
  let headers = new HttpHeaders().set('Content-Type','application/json');
     
  return this.http.get(this.URL + '/diagnosticosOdont/'+id, {headers: headers});
}

odoDiag(id: string): Observable<any> {
  let headers = new HttpHeaders().set('Content-Type','application/json');
     
  return this.http.get(this.URL + '/odontoDiagnostico/'+id, {headers: headers});
}

seguiPac(id: string): Observable<any> {
  let headers = new HttpHeaders().set('Content-Type','application/json');
     
  return this.http.get(this.URL + '/pacienteSeg/'+id, {headers: headers});
}

pacOdo(id: string): Observable<any> {
  let headers = new HttpHeaders().set('Content-Type','application/json');
     
  return this.http.get(this.URL + '/odontoPaciente/'+id, {headers: headers});
}

  
}
