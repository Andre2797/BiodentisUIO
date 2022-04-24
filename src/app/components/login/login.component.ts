import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from './ILogin';
import { NotificationService } from 'src/app/services/notification.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  public userControl:FormGroup|any;
  public user:User={
    correo:'',
    contrasenia:''
  }
  loginForm;

  constructor(private autService:AuthService
    ,private router:Router,private formBuilder: FormBuilder,private notifyService : NotificationService) { 
      this.loginForm=this.formBuilder.group({
        correo:  ['', [Validators.required, Validators.email]],
        contrasenia:  ['', [Validators.required]],
      });
    }

  ngOnInit(): void {
    
  }
  
  public erroruser=true;
  public intenos=0;

  iniciarSesion() {
    if (this.loginForm.valid && this.intenos <= 2) {
      this.erroruser=true;
      this.autService.login(this.loginForm.value)
      .subscribe(
        res=>{
          console.log(res)
          localStorage.setItem('token',res.token);
          this.router.navigate(['/menu/home'])
        },
        err=>{
          console.log(err)
          this.notifyService.showError("Credenciales Incorrectas", "ERROR")
         this.erroruser=false;
         this.intenos++;
          this.loginForm.setValue({correo: '', contrasenia: ''});  
         }
      )
    }else{
      this.erroruser=true;
      this.autService.userBlock(this.loginForm.value).subscribe(
        res=>{
          console.log(res)},
          err=>{
            console.log(err)
          })
      this.notifyService.showInfo("Usuario Bloqueado a superado el limite de intentos", "Bloqueo")
      this.loginForm.setValue({correo: '', contrasenia: ''});
    }
    

  }




}