import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private autService:AuthService
    ,private router:Router,private formBuilder: FormBuilder,private notifyService : NotificationService) { 
    }

  ngOnInit(): void {
  }

  onLogout() {
    this.autService.logout()
    this.router.navigate(['/login'])
   
  }
  
}
