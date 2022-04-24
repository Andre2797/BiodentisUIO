import { Component, OnInit } from '@angular/core';
import { OdontogramaService } from 'src/app/services/odontograma.service';
import {odo} from '../../../assets/js/odontograma.js'
import {pincel} from '../../../assets/js/pincel.js'

@Component({
  selector: 'app-odontograma',
  templateUrl: './odontograma.component.html',
  styleUrls: ['./odontograma.component.css']
})
export class OdontogramaComponent implements OnInit {

  constructor( private odoService: OdontogramaService) { }
  
  ngOnInit(): void {
    
    const querystring = window.location.href;
    let result = querystring.split("/")
    let id_odo = result[5]

    this.odoService.pacOdo(id_odo).subscribe(
      res => {
        console.log("PAC ", res)
        res.forEach(element => {
          $('#nombrepac').text(element.nombre +" " +element.apellido)
          console.log("NOMBRE TITULOOO",element.nombre)
        });
      })
      localStorage.removeItem('procedimentos')
      odo();
      pincel();
 
    
  }



}
