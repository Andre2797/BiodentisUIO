import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PacienteService } from '../../services/paciente.service';
import { OdontogramaService } from '../../services/odontograma.service';

@Component({
  selector: 'app-procedimientos',
  templateUrl: './procedimientos.component.html',
  styleUrls: ['./procedimientos.component.css']
})
export class ProcedimientosComponent implements OnInit {

  constructor(private pacienteService: PacienteService, private route: ActivatedRoute, private diagnosticoService: OdontogramaService) { }
  firstParam
  paciente
  diagnostico = []
  general
  tratamiento
  procedimiento = {
    nombre: "",
    numero: "",
    descripcion: "",
    costo: "",
    sesion: ""

  }
  ngOnInit(): void {
    this.firstParam = this.route.snapshot.paramMap.get('id');
    this.fetchPaciente()
  }

  async fetchPaciente() {

    await this.pacienteService.paciente(this.firstParam)
      .subscribe(
        async res => {
          console.log(res);
          this.paciente = res
          console.log("ODONTOGRAMASSS", this.paciente.odontogramas)



          for (let index = 0; index < this.paciente.odontogramas.length; index++) {
            const element = this.paciente.odontogramas[index];
            console.log(element)

            await this.diagnosticoService.diagnotico(element._id).subscribe(
              res => {
                console.log(res);
                this.general = res
                this.general.forEach(element => {


                  for (let i = 0; i < element.diagnostico.length -1; i++) {
                    const diag = element.diagnostico[i];

                    this.procedimiento.nombre = diag.nome
                    this.procedimiento.numero = diag.numeroDente
                    console.log("DIAGNOSTICO EN ODOYTOGEMA",element)
                    for (let j = 0; j < element.tratamientos.length; j++) {
                      const trata = element.tratamientos[i];
                      console.log("TRATAMIENTO EN ODONTOGRMA",element)
                      if (trata == null) {
                        element.diagnostico[i] = null
                      } else {
                        this.procedimiento.descripcion = trata.descripcion
                        this.procedimiento.costo = trata.costo
                        this.procedimiento.sesion = trata.sesiones
                      }


                    }
                    console.log(this.procedimiento)

                    this.diagnostico.push(this.procedimiento)
                    this.procedimiento = {
                      nombre: "",
                      numero: "",
                      descripcion: "",
                      costo: "",
                      sesion: ""
                    }


                  }




                  console.log(this.diagnostico)


                });
                
              },
              err => console.log(err)
            )
            this.general = {}
          };

        },
        err => console.log(err)
      )

  }

}
