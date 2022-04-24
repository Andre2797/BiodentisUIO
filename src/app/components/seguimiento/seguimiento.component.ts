import { Component, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PacienteService } from '../../services/paciente.service';
import { OdontogramaService } from '../../services/odontograma.service';
import { TratamientoService } from '../../services/tratamiento.service';
import * as moment from 'moment';
import { NotificationService } from '../../services/notification.service';



interface IPaginate {
  itemsPerPage: number[],
  currentPage: number,
  totalItems: number
}
@Component({
  selector: 'app-seguimiento',
  templateUrl: './seguimiento.component.html',
  styleUrls: ['./seguimiento.component.css']
})
export class SeguimientoComponent implements OnInit {
  public odo: any = [];
  public page = 1;
  public count = 0;
  public tableSize = 1;
  public tableSizes = [3, 6, 9, 12];

  public paginate: IPaginate = {
    itemsPerPage: [this.tableSize],
    currentPage: this.page,
    totalItems: this.count
  }
  constructor(private pacienteService: PacienteService, private odoService: OdontogramaService, private seguimientoService: TratamientoService
    , private router: Router, private route: ActivatedRoute, private notifyService: NotificationService) {

  }
  firstParam
  seguimiento
  fechaseg
  total = 0
  saldo = 0
  abono = 0
  segumientoupdate = {
    total: '',
    saldo: '',
    abono: ''
  };
  tratmientoupdate = {
    saldo: '',
    abono: ''
  }
  arryatratamientos = []
  id_diag: any = [];
  saldotra: any = []
  abonotra: any = []
  ngOnInit(): void {
    this.firstParam = this.route.snapshot.paramMap.get('id');
    this.fetchSeguimiento();
    

  }

  async fetchSeguimiento() {

    await this.seguimientoService.segumineto(this.firstParam)
      .subscribe(
        res => {
          console.log(res);
          this.seguimiento = res;
          this.fechaseg = moment(this.seguimiento.fecha).format('YYYY/MM/DD');
          this.seguimiento.tratamientos.forEach(element => {
            this.total = this.total + Number(element.costo)
            this.segumientoupdate.total = String(this.total)
           

          });
          setTimeout(() => {
            this.calTotalabono()
           
          }, 1500);
         

        },
        err => console.log(err)
      )
      


  }
  public saldofinal = []
  cal() {
    let array_input: any = [];
    let array_input_reduce: any = [];
    console.log("ENTREE")

    let saldo: any = [];
    this.arryatratamientos.push(this.tratmientoupdate)
    try {
      console.log("SEGUIMIENTOOOO", this.seguimiento)


      for (let i = 0; i < this.seguimiento.tratamientos.length; i++) {
        console.log("ENTREEE AL FORRRRR")
        var a: any = parseInt((<HTMLInputElement>document.getElementById("abono" + i)).value) || 0;
        var b: any = parseInt((<HTMLInputElement>document.getElementById("abono" + i)).value) || 0;


        array_input.push(a)
        array_input_reduce.push(b)

        localStorage.setItem("item", array_input)
        var tabono: any = (<HTMLInputElement>document.getElementById("totalabono"))

        var leer = localStorage.getItem("item").split(',')
        console.log(leer)

        console.log("tipo de ", typeof (leer))
        leer.forEach(element => {
          console.log(typeof (parseInt(element)))
          var num = 0
          num = num + parseInt(element)
          this.abonotra.push(String(element))


        });

        let sum = 0;
        for (let i = 0; i < leer.length; i++) {
          sum += Number(leer[i]);

        }


        tabono.value = sum
        this.segumientoupdate.abono = tabono.value

      }



    } catch (e) { }

    for (let j = 0; j < this.seguimiento.tratamientos.length; j++) {
      const element1 = this.seguimiento.tratamientos[j];
      console.log("COSTOS", element1.costo)
      for (let k = 0; k < leer.length; k++) {
        const element2 = leer[j];
        console.log("ABONO", element2)

        var reduce = 0;
        reduce = Number(element1.costo) - Number(element2)
        console.log("RESTA", reduce)
        break;
      }

      saldo.push(reduce);

    }

    console.log("SALDO", saldo)
    this.saldofinal = saldo
    let sum2 = 0;
    var tsaldo: any = (<HTMLInputElement>document.getElementById("totalsaldo"))
    for (let i = 0; i < saldo.length; i++) {
      sum2 += Number(saldo[i]);
      this.saldotra.push(saldo[i])
    }
    console.log(sum2);
    tsaldo.value = sum2
    this.segumientoupdate.saldo = tsaldo.value


  }
  calTotalabono() {
    let array_input: any = [];
    let array_input_saldo: any = [];
    console.log("ENTREE")

    let saldo: any = [];
    this.arryatratamientos.push(this.tratmientoupdate)
    try {
      console.log("SEGUIMIENTOOOO", this.seguimiento)

      console.log(this.seguimiento.tratamientos.length)
      
      for (let i = 0; i < this.seguimiento.tratamientos.length; i++) {
        console.log("ENTREEE AL FORRRRR")
        console.log(document.getElementsByClassName("cantidad")[i])
        var a: any = parseInt((<HTMLInputElement>document.getElementById("abono" + i)).value) || 0;
        console.log("AAAAAA", a)

        array_input.push(a)


        localStorage.setItem("item", array_input)
        var tabono: any = (<HTMLInputElement>document.getElementById("totalabono"))

        var leer = localStorage.getItem("item").split(',')
        console.log(leer)

        console.log("tipo de ", typeof (leer))
        leer.forEach(element => {
          console.log(typeof (parseInt(element)))
          var num = 0
          num = num + parseInt(element)
          this.abonotra.push(String(element))


        });

        let sum = 0;
        for (let i = 0; i < leer.length; i++) {
          sum += Number(leer[i]);

        }


        tabono.value = sum
        console.log(tabono)
        this.segumientoupdate.abono = tabono.value
      }
      
    } catch (e) { }
    for (let j = 0; j < this.seguimiento.tratamientos.length; j++) {
      const element1 = this.seguimiento.tratamientos[j];
      console.log("COSTOS", element1.costo)
      for (let k = 0; k < leer.length; k++) {
        const element2 = leer[j];
        console.log("ABONO", element2)

        var reduce = 0;
        reduce = Number(element1.costo) - Number(element2)
        console.log("RESTA", reduce)
        break;
      }

      saldo.push(reduce);

    }

    console.log("SALDO", saldo)
    this.saldofinal = saldo
    let sum2 = 0;
    var tsaldo: any = (<HTMLInputElement>document.getElementById("totalsaldo"))
    for (let i = 0; i < saldo.length; i++) {
      sum2 += Number(saldo[i]);
      this.saldotra.push(saldo[i])
    }
    console.log(sum2);
    tsaldo.value = sum2
    this.segumientoupdate.saldo = tsaldo.value
  }
  calsaldo() {
    console.log("ENTREE")
    let array_input_saldo: any = [];
    try {
      for (let i = 0; i < this.seguimiento.tratamientos.length; i++) {

        var a: any = parseInt((<HTMLInputElement>document.getElementById("saldo" + i)).value) || 0;
        console.log(a)
        array_input_saldo.push(a)

        localStorage.setItem("saldo", array_input_saldo)
        var tsaldo: any = (<HTMLInputElement>document.getElementById("totalsaldo"))
        var leer2 = localStorage.getItem("saldo").split(',')
        console.log(leer2)
        console.log("tipo de ", typeof (leer2))
        leer2.forEach(element => {
          console.log(typeof (parseInt(element)))
          var num = 0
          num = num + parseInt(element)


        });

        let sum2 = 0;

        for (let i = 0; i < leer2.length; i++) {
          sum2 += Number(leer2[i]);
        }
        console.log(sum2);
        tsaldo.value = sum2


        this.segumientoupdate.saldo = tsaldo.value

      }

    } catch (e) { }
  }



  onTableDataChange(event: any) {
    this.page = event;
    this.fetchSeguimiento();
  }

  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.fetchSeguimiento();
  }



  actualizarSeguimiento() {
    console.log(this.segumientoupdate)
    for (let i = 0; i < this.seguimiento.tratamientos.length; i++) {
      const element = this.seguimiento.tratamientos[i];
      console.log(element)
      for (let j = 0; j < this.saldofinal.length; j++) {
        const element2 = this.saldofinal[i];
        element.saldo = String(element2)


      }
      console.log("CAMBIADO", element)


    }
    console.log("TRATAMIENTO ACTUALIZAR", this.seguimiento.tratamientos)

    this.seguimientoService.actualizarSeguimiento(this.segumientoupdate, this.firstParam).subscribe(
      res => {
        console.log(res)

        this.seguimiento.tratamientos.forEach(element => {

          this.seguimientoService.actualizarTratamiento(element, element._id).subscribe(
            res => {
              console.log(res)
              this.notifyService.showSuccess("Datos del segumiento actulizados exitosamente", "Actualización de campos")
              this.router.navigate(['/menu/tabla-Historias-Clinicas'])
            },
            err => console.log(err)
          )

        });




      },
      err => console.log(err)
    )
  }
  goBack() {
    this.router.navigate(['/menu/home']);
  }

}
