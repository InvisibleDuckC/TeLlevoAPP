import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pasajero',
  templateUrl: './pasajero.component.html',
  styleUrls: ['./pasajero.component.scss'],
})
export class PasajeroComponent {
  @Input() pasajeroData: any;  // Recibe los datos del pasajero
  @Output() savePasajeroData: EventEmitter<any> = new EventEmitter();

  guardarDatosPasajero() {
    this.savePasajeroData.emit(this.pasajeroData);  // Emite los datos hacia la página de perfil
  }
}
