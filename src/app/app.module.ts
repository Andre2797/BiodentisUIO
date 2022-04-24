import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from "./auth.guard";
import { HistoriaClinicaComponent } from './components/historia-clinica/historia-clinica.component';
import { OdontogramaComponent } from './components/odontograma/odontograma.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule } from "@angular/material/core";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { TablaHistoriasClinicasComponent } from './components/tabla-historias-clinicas/tabla-historias-clinicas.component';
import { MenuComponent } from './components/menu/menu.component';
import { MatToolbarModule} from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule} from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTableModule } from '@angular/material/table';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NavbarComponent } from './navbar/navbar.component';
import { CitaComponent } from './components/cita/cita.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';
import { FullCalendarModule } from 'primeng/fullcalendar';
import {MatDialogModule} from '@angular/material/dialog';
import { SeguimientoComponent } from './components/seguimiento/seguimiento.component';
import { TratamientoComponent } from './components/tratamiento/tratamiento.component';
import { ProcedimientosComponent } from './components/procedimientos/procedimientos.component';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    HistoriaClinicaComponent,
    OdontogramaComponent,
    TablaHistoriasClinicasComponent,
    MenuComponent,
    NavbarComponent,
    CitaComponent,
    SeguimientoComponent,
    TratamientoComponent,
    ProcedimientosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatListModule,
    MatMenuModule,
    MatExpansionModule,
    MatTableModule,
    FontAwesomeModule,
    NgbModule,
    NgxPaginationModule,
    FullCalendarModule,
    MatDialogModule,
    NgxSpinnerModule
   
   
  ],
  providers: [
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
