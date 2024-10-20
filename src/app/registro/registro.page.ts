import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage {

  formularioVisible: string = ''; // Almacena cuál formulario mostrar ('chofer' o 'cliente')
  choferForm: FormGroup;
  clienteForm: FormGroup;

  constructor(private fb: FormBuilder) {
    // Inicializa el formulario de chofer
    this.choferForm = this.fb.group({
      nombre: ['', Validators.required],
      licencia: ['', Validators.required]
    });

    // Inicializa el formulario de cliente
    this.clienteForm = this.fb.group({
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]]
    });
  }

  // Alterna la visibilidad de los formularios
  mostrarFormulario(tipo: string) {
    // Si el tipo es 'chofer', muestra el formulario de chofer y oculta el de cliente
    if (tipo === 'chofer') {
      this.formularioVisible = 'chofer';
    } else if (tipo === 'pasajero') {
      // Si el tipo es 'cliente', muestra el formulario de cliente y oculta el de chofer
      this.formularioVisible = 'pasajero';
    }
  }

  // Acción al enviar formulario de chofer
  enviarChofer() {
    if (this.choferForm.valid) {
      console.log('Datos del chofer:', this.choferForm.value);
    } else {
      console.log('Formulario de chofer no es válido.');
    }
  }

  // Acción al enviar formulario de cliente
  enviarPasajero() {
    if (this.clienteForm.valid) {
      console.log('Datos del pasajero:', this.clienteForm.value);
    } else {
      console.log('Formulario de pasajero no es válido.');
    }
  }
}




