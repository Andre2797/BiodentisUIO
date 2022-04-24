import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TratamientoService } from 'src/app/services/tratamiento.service';
import { OdontogramaService } from '../../services/odontograma.service';
import { NotificationService } from '../../services/notification.service';


@Component({
  selector: 'app-tratamiento',
  templateUrl: './tratamiento.component.html',
  styleUrls: ['./tratamiento.component.css']
})
export class TratamientoComponent implements OnInit {

  constructor(private tratamientoService: TratamientoService, private router: Router, private odoService: OdontogramaService,private notifyService: NotificationService) { }
  public diagnos;
  public id_diag: string[] = []
  diagli;
  showModalBox: boolean = false;
  ngOnInit(): void {
    this.fetchDiag()
  }

  fetchDiag() {
    var idodo = localStorage.getItem('odontograma');
    console.log(idodo)
    this.tratamientoService.dianosticvos(idodo).subscribe(
      res => {
        console.log(res);
        this.diagnos = res;

      },
      err => console.log(err)
    )


  }

  nombreSelect=[];
  numSelect=[];
  tratamientosarry = {
    descripcion: '',
    costo: '',
    sesiones: '',
    nombre:'',
    numero:''
  };
  open(nombre, numero, id) {
    if (0) {
      // Dont open the modal
      this.showModalBox = false;

    } else {
      // Open the modal
      this.showModalBox = true;
      this.tratamientosarry.nombre=nombre
      this.tratamientosarry.numero=numero
     /*  this.nombreSelect.push(nombre);
      this.numSelect.push(numero); */
      this.id_diag.push(id)
      console.log(this.id_diag)

    }


  }

  

  arryatratamientos = []

  saveTratamientos = () => {
    console.log(this.tratamientosarry)
    this.arryatratamientos.push(this.tratamientosarry)
    console.log("TRATAMIENTOS", this.arryatratamientos)
    this.tratamientosarry = {
      descripcion: '',
      costo: '',
      sesiones: '',
      nombre:'',
      numero:''
    };
    this.notifyService.showSuccess("Tratamiento Agregado Exitosamente", "Modal Tratamiento")
    this.atualizaTabela()
    this.showModalBox = false;
    $('#myModal').modal('hide');
   

  }





  atualizaTabela = () => {
    const tbody = document.getElementById('tratamientos')
    let trs = ''
    let tr = ''
    this.arryatratamientos.forEach((item, index) => {
      tr = `
            <tr>
                <td>
                    ${index}
                </td>
                <td>
                    ${item.descripcion || 'Ninguna Descripción adicional'}
                </td>
                <td>
                ${item.costo}
            </td>
            <td>
                ${item.sesiones}
            </td>
                <td>
                    <button
                    (click)="apagar('${item.descripcion}', '${item.costo}', '${item.sesiones}')"
                     class="btn btn-danger">
                        <i class="far fa-trash-alt"></i>
                    </button>
                </td>
            </tr>
        `
      trs = tr

    })
    console.log(trs)
    document.getElementById('tratamientos').innerHTML + trs

  }

  apagar = (descripcion, costo, sesiones) => {
    console.log("entrnado..")
    const procd = this.arryatratamientos.find(prc => prc.descripcion === descripcion && prc.costo === costo && prc.sesiones === sesiones)
    this.arryatratamientos.splice(this.arryatratamientos.indexOf(procd), 1)

    this.atualizaTabela()

  }
  id_seguimiento
  crearTratamiento = async () => {
    console.log("CREAR TRATAMIENTOS", this.arryatratamientos)
    this.arryatratamientos.forEach(async element => {

      console.log(this.id_diag)
      element.saldo = 0
      element.abono = 0

      await this.diagnos.forEach(async element3 => {
        console.log("ID DIAG", element3._id)
        element.diagnostico = element3._id
        await this.odoService.odoDiag(element3._id).subscribe(
          resodo => {
            console.log("BUSCAR ODO ", resodo)
            resodo.forEach(async element4 => {
              console.log(element4.odontograma._id)
              await this.odoService.pacOdo(element4.odontograma._id).subscribe(
                res => {
                  console.log("PAC ", res)

                  res.forEach(async element5 => {
                    console.log(element5._id);
                    await this.odoService.seguiPac(element5._id).subscribe(
                      res => {
                        console.log("Seguimiento",res)
                        res.forEach(element6 => {
                          console.log(element6)
                          element.seguimiento = element6._id
                          this.id_seguimiento = element6._id
                        });


                      },
                      err => console.log(err)
                    )

                  });

                },
                err => console.log(err)
              )
            });

          },
          err => console.log(err)
        )
      });


      console.log("ELEMENTO PARA CREAR TRATAMIENTO", element)
      await this.tratamientoService.crearTratamiento(element)
        .subscribe(
          res => {
            console.log("TRAMIENTO CREADO", res)

            /* this.router.navigate(['/menu/seguimiento/' + this.id_seguimiento]) */
            this.router.navigate(['/menu/tabla-Historias-Clinicas'])

          },
          err => console.log(err)
        )
    });


  }

  goBack() {
    this.router.navigate(['/tuRuta']);
    }


}


