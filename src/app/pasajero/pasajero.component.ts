import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-pasajero',
  templateUrl: './pasajero.component.html',
  styleUrls: ['./pasajero.component.scss'],
})
export class PasajeroComponent  implements OnInit {

  clienteForm: FormGroup;

  constructor(private fb: FormBuilder) {

    // Inicializa el formulario de cliente
    this.clienteForm = this.fb.group({
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit() {}

}
