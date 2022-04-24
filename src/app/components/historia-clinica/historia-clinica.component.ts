import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RoutesRecognized } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validator, Validators } from '@angular/forms';
import { OdontogramaService } from 'src/app/services/odontograma.service';
import { PacienteService } from 'src/app/services/paciente.service';
import { Paciente } from './IPaciente'
import { Historia } from "./IHistoria";
import { NotificationService } from 'src/app/services/notification.service';
import $, { param } from 'jquery'
import "jquery-datetimepicker";
import { TratamientoService } from '../../services/tratamiento.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-historia-clinica',
  templateUrl: './historia-clinica.component.html',
  styleUrls: ['./historia-clinica.component.css'],

})

export class HistoriaClinicaComponent implements OnInit {

  public pacienteControl: FormGroup | any;
  public paciente: Paciente = {
    nombre: '',
    apellido: '',
    numCedula: '',
    celular: '',
    direccion: '',
    sexo: '',
    fechaNacimiento: '',
    edad: '',
    correo: ''
  };
  pacienteForm;

  public historiaControl: FormGroup | any;


  public historia: Historia = {
    temperatura: '',
    peso: '',
    presion: '',
    anestesia: '',
    alergia: '',
    hemoragia: '',
    tratamientoMedico: '',
    paciente: ''
  }

  historiaForm;

  public odontograma = {
    fechaOdonto: Date.now(),
    paciente: ""

  }



  public edited = true;
  public second = false;
  public error = false;
  public errormail = false;
  public pacienteSave: any = [];
  public sexoFEdit;
  public sexoHEdit;
  constructor(private pacienteService: PacienteService, private odoService: OdontogramaService, private trataService: TratamientoService
    , private router: Router, private formBuilder: FormBuilder, private notifyService: NotificationService,
    private route: ActivatedRoute,private _location: Location) {
    console.log(this.route.snapshot.params.id);

    if (this.route.snapshot.params.id) {
      this.pacienteService.paciente(this.route.snapshot.params.id)
        .subscribe(
          res => {
            console.log(res);
            this.pacienteSave = res;
            this.edited = false;
           
            if (this.pacienteSave.sexo == "F") {
              this.sexoFEdit = "F";
              this.sexoHEdit = "";
            } else {
              this.sexoFEdit = "";
              this.sexoHEdit = "M";
            }
          },
          err => console.log(err)
        )

    } else {
      this.pacienteSave = false;
      this.sexoHEdit = "";
      this.sexoFEdit = "";
      this.pacienteService.numHistorias()
        .subscribe(
          res => {
            console.log(res)


            let app = (<HTMLInputElement>document.getElementById('input')).value = String(res)
            console.log(app);



          },
          err => console.log(err)
        )


    }

    this.pacienteForm = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.maxLength(25)]],
      apellido: ['', [Validators.required, Validators.maxLength(30)]],
      numCedula: ['', [Validators.required, Validators.maxLength(10)]],
      celular: ['', [Validators.required, Validators.maxLength(10)]],
      direccion: ['', [Validators.required]],
      sexo: ['', [Validators.required]],
      fechaNacimiento: ['', [Validators.required]],
      edad: ['', [Validators.required]],
      correo: ['', [Validators.required, Validators.email]]
    });





    this.historiaForm = this.formBuilder.group({
      temperatura: ['', [Validators.required]],
      peso: ['', [Validators.required]],
      presion: ['', [Validators.required]],
      anestesia: [''],
      alergia: [''],
      hemoragia: [''],
      tratamientoMedico: [''],
      paciente: [''],
    });

  }

  ngOnInit(): void {


  }
  public edadvalue: string = '';

  maxDate = new Date(2020, 11, 31);
  CalculateAge() {

    var fechaNace: any = new Date(this.pacienteForm.get('fechaNacimiento')?.value);
    var fechaActual: any = new Date();

    var mes = fechaActual.getMonth();
    var dia = fechaActual.getDate();
    var año = fechaActual.getFullYear();

    fechaActual.setDate(dia);
    fechaActual.setMonth(mes);
    fechaActual.setFullYear(año);

    $("#edad_input").val(Math.floor(((fechaActual - fechaNace) / (1000 * 60 * 60 * 24) / 365)));

    this.pacienteForm.controls['edad'].setValue($("#edad_input").val() ?? null);

    console.log(this.pacienteForm.value)
    return $("#edad_input").val(Math.floor(((fechaActual - fechaNace) / (1000 * 60 * 60 * 24) / 365)));

  }
  public seguimiento = {
    fecha: new Date().toISOString().slice(0, 10),
    total: "",
    abono: "",
    saldo: "",
    paciente: ""

  }

  id_paciente
  async newPaciente() {
    console.log(this.pacienteForm.value)

    if (this.pacienteForm.valid) {

      await this.pacienteService.crearPaciente(this.pacienteForm.value)
        .subscribe(
          res => {
            console.log(res)
            //this.router.navigate(['/historia'])
            this.id_paciente = res._id
            //this.edited = false;
            this.second = true;
            this.seguimiento.paciente = this.id_paciente;
            console.log(this.seguimiento.paciente)
            this.newSeguimiento()
          },
          err => console.log(err)
        )
    } else {
      this.notifyService.showError("Campos requeridos se encuentran vacios", "Campos requeridos")


    }


  }


  async newSeguimiento() {
    await this.trataService.crearSeguimiento(this.seguimiento).subscribe(

      res2 => {
        console.log(res2)

      }, err2 => console.log(err2)
    )
  }




  id_odontograma;

  newHiatoria() {
    
    if (this.historiaForm.valid) {
      this.historiaForm.controls['paciente'].setValue(this.id_paciente);

      this.pacienteService.crearHistoria(this.historiaForm.value)
        .subscribe(
          res => {
            console.log(res)
            this.odontograma.paciente = this.id_paciente
            this.odoService.crearOdontograma(this.odontograma).subscribe(

              res2 => {
                console.log(res2)
                this.id_odontograma = res2._id
                this.router.navigate(['/menu/odontograma/' + this.id_odontograma])
              }, err2 => console.log(err2)
            )



          },
          err => console.log(err)
        )
    } else {
      this.notifyService.showError("Campos requeridos se encuntran vacios", "Campos requeridos")
    }


  }

  updatePaciente() {

    this.pacienteForm.controls['nombre'].setValue(this.pacienteSave.nombre);
    this.pacienteForm.controls['apellido'].setValue(this.pacienteSave.apellido);
    this.pacienteForm.controls['numCedula'].setValue(this.pacienteSave.numCedula);
    this.pacienteForm.controls['sexo'].setValue(this.pacienteSave.sexo);
    this.pacienteForm.controls['edad'].setValue(this.pacienteSave.edad);

    this.pacienteForm.controls['fechaNacimiento'].setValue("27-11-1197");
    console.log(this.pacienteForm.value)
    if (this.pacienteForm.get('celular')?.value == "") {
      this.pacienteForm.controls['celular'].setValue(this.pacienteSave.celular);
    }
    if (this.pacienteForm.get('direccion')?.value == "") {
      this.pacienteForm.controls['direccion'].setValue(this.pacienteSave.direccion);
    }
    if (this.pacienteForm.get('correo')?.value == "") {
      this.pacienteForm.controls['correo'].setValue(this.pacienteSave.correo);
    }

    console.log(this.pacienteForm.valid);
    if (this.pacienteForm.valid) {

      this.pacienteService.actualizarPaciente(this.pacienteForm.value, this.route.snapshot.params.id)
        .subscribe(
          res => {
            console.log(res)
            this.notifyService.showSuccess("Datos del paciente actulizados exitosamente", "Actualización de campos")
            this.router.navigate(['/menu/tabla-Historias-Clinicas'])




          },
          err => console.log(err)
        )
    } else {
      this.notifyService.showError("Campos requeridos se encuntran vacios", "Campos requeridos")


    }


  }
  goBack(){
    this.router.navigate(['/menu/home']);
  }


}
