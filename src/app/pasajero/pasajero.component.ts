import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';


@Component({
  selector: 'app-pasajero',
  templateUrl: './pasajero.component.html',
  styleUrls: ['./pasajero.component.scss'],
})
export class PasajeroComponent  implements OnInit {

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

  constructor(private fb: FormBuilder) {

  }

  ngOnInit() {
    this.cargarDesdeSessionStorage()
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
