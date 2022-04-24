import { Component, OnInit } from '@angular/core';
import { PacienteService } from 'src/app/services/paciente.service';
import { NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
import { Paciente } from '../historia-clinica/IPaciente';
import { OdontogramaService } from 'src/app/services/odontograma.service';
import { Router } from '@angular/router';
import { TratamientoService } from '../../services/tratamiento.service';
interface IPaginate {
  itemsPerPage: number[],
  currentPage: number,
  totalItems: number
}
@Component({
  selector: 'app-tabla-historias-clinicas',
  templateUrl: './tabla-historias-clinicas.component.html',
  styleUrls: ['./tabla-historias-clinicas.component.scss']

})

export class TablaHistoriasClinicasComponent implements OnInit {

  public paciente: any = [];
  public page = 1;
  public count = 0;
  public tableSize = 1;
  public tableSizes = [3, 6, 9, 12];

  public paginate: IPaginate = {
    itemsPerPage: [this.tableSize],
    currentPage: this.page,
    totalItems: this.count
  }

  constructor(private pacienteService: PacienteService,private odoService: OdontogramaService,private seguimientoService: TratamientoService
    , private router: Router) {


  }

  ngOnInit(): void {
    this.fetchPacientes();

  }
  

  fetchPacientes() {
    this.pacienteService.pacientes(this.page, 5)
      .subscribe(
        res => {
          console.log(res)
            ;
          this.paciente = res;
        },
        err => console.log(err)
      )
  }
  onTableDataChange(event: any) {
    this.page = event;
    this.fetchPacientes();
  }

  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.fetchPacientes();
  }
  buscarpaciente = {
    nombre: '',
    numCedula: ''
  }

  changeinput(){
    if( $('#option-1').is(':checked') ) {
     
      $("#busqueda").keydown(function(event) {
        if(event.shiftKey)
        {
             event.preventDefault();
        }
   
        if (event.keyCode == 46 || event.keyCode == 8)    {
        }
        else {
             if (event.keyCode < 95) {
               if (event.keyCode < 48 || event.keyCode > 57) {
                     event.preventDefault();
               }
             } 
             else {
                   if (event.keyCode < 96 || event.keyCode > 105) {
                       event.preventDefault();
                   }
             }
           }
        });
      
  }
 
  }

  //función que realiza la busqueda
  jsBuscar() {

    //obtenemos el valor insertado a buscar
   
    const buscar = $("#busqueda").prop("value")

    const nombre = <HTMLInputElement>document.getElementById("option-1");
    var isCheckedname = nombre.checked;
    if (isCheckedname) {
      this.buscarpaciente.numCedula = buscar
      this.buscarpaciente.nombre = null
    } else {
      this.buscarpaciente.nombre = buscar
      this.buscarpaciente.numCedula = null
    }

    this.pacienteService.buscarPaciente(this.buscarpaciente).subscribe(
      res => {
        console.log(res)
          ;
        this.paciente = res;
      },
      err => console.log(err)
      
    )



  }

  public odontograma = {
    fechaOdonto:Date.now(),
    paciente:""

  }
  
  id_odontograma;
  newOdo(id_pac){
   
        this.odontograma.paciente=id_pac
    
  
    this.odoService.crearOdontograma(this.odontograma).subscribe(

      res2 => { console.log(res2)
        this.id_odontograma=res2._id
        this.router.navigate(['/menu/odontograma/'+this.id_odontograma])
       }, err2 => console.log(err2)
    )
  }

  newSeguimiento(){
    console.log(this.paciente)
    let idpac=""
    this.paciente.pac.forEach(element => {
      console.log(element._id)
        idpac=element._id
    });
  
    this.router.navigate(['/menu/seguimiento/'+idpac])
  }

  newProcedimiento(){
    let idpac=""
    this.paciente.pac.forEach(element => {
      console.log(element._id)
        idpac=element._id
    });
  
    this.router.navigate(['/menu/procediminetos/'+idpac])
  }

}