import { Component, OnInit } from '@angular/core';
import { ViajeService } from '../services/viaje.service';
import { Viaje } from '../models/viaje';

@Component({
  selector: 'app-mis-viajes',
  templateUrl: './mis-viajes.page.html',
  styleUrls: ['./mis-viajes.page.scss'],
})
export class MisViajesPage implements OnInit {
  misViajesComoChofer: Viaje[] = [];
  misViajesComoPasajero: Viaje[] = [];
  segmentoSeleccionado: string = 'chofer'; // Por defecto mostrar los de chofer
  
  constructor(private viajeService: ViajeService) {}

  ngOnInit() {
    const uid = sessionStorage.getItem('uid');
    if (!uid) {
      console.error('No se ha encontrado el UID del usuario');
      return;
    }

    this.viajeService.getViajesComoChofer(uid).subscribe(viajes => {
      this.misViajesComoChofer = viajes;
    });

    this.viajeService.getViajesComoPasajero(uid).subscribe(viajes => {
      this.misViajesComoPasajero = viajes;
    });
  }

  segmentoCambiado(event: any) {
    // Optional: manejar cambio de segmento
  }
}
