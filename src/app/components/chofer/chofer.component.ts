import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-chofer',
  templateUrl: './chofer.component.html',
  styleUrls: ['./chofer.component.scss'],
})
export class ChoferComponent {
  @Input() choferData: any;  // Recibe los datos del chofer
  @Output() saveChoferData: EventEmitter<any> = new EventEmitter();

  guardarDatosChofer() {
    this.saveChoferData.emit(this.choferData);  // Emite los datos hacia la página de perfil
  }
}
