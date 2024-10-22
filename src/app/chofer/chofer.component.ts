import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-chofer',
  templateUrl: './chofer.component.html',
  styleUrls: ['./chofer.component.scss'],
})
export class ChoferComponent  implements OnInit {

  user = {
    usuario: '',
    nombre: "",
    apellido: "",
    sede:"",
    carrera:"",
    patente :'',
    marca:'',
    modelo:'',
    asientos:'',
    direccion :'',
    pasajeros:''
  };
  
  constructor() {
    this.cargarDesdeSessionStorage();
  }

  ngOnInit() {
    
  }

  guardarEnSessionStorage() {
    sessionStorage.setItem('user', JSON.stringify(this.user));
  }

  cargarDesdeSessionStorage() {
    const userData = sessionStorage.getItem('user');
    if (userData) {
      this.user = JSON.parse(userData);
    }
  }

}
