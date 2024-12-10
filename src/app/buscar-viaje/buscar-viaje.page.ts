import { Component, OnInit } from '@angular/core';
import { ViajeService } from '../services/viaje.service';
import { Viaje } from '../models/viaje';
import { ToastController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-buscar-viaje',
  templateUrl: './buscar-viaje.page.html',
  styleUrls: ['./buscar-viaje.page.scss'],
})
export class BuscarViajePage implements OnInit {

  viajesDisponibles: Viaje[] = [];
  numeroAcompanantes: number = 1;
  opcionesAcompanantes: number[] = [0, 1, 2, 3];


  constructor(
    private viajeService: ViajeService, 
    private toastController: ToastController,
    private firestore: AngularFirestore
  ) {}

  async ngOnInit() {
    const uid = sessionStorage.getItem('uid');
    if (!uid) {
      console.error('No se ha encontrado el UID del usuario');
      return;
    }

    // Cargar viajes disponibles
    this.viajeService.getViajesDisponibles().subscribe(viajes => {
      this.viajesDisponibles = viajes;
    });

    // Cargar la cantidad de acompañantes desde 'pasajeros'
    try {
      const doc = await this.firestore.collection('pasajeros').doc(uid).get().toPromise();
      if (doc && doc.exists) {
        const data = doc.data() as any;
        if (data && typeof data['acompanantes'] === 'number') {
          // Asignar el valor de acompañantes obtenido de Firestore
          this.numeroAcompanantes = data['acompanantes'];
        } else {
          console.log('Campo acompañantes no encontrado, se usará valor por defecto (0)');
          this.numeroAcompanantes = 0;
        }
      } else {
        console.log('No existe documento para este pasajero, se usará valor por defecto (0)');
        this.numeroAcompanantes = 0;
      }
    } catch (error) {
      console.error('Error al cargar datos de pasajero:', error);
      this.numeroAcompanantes = 0;
    }
  }

  async mostrarToast(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }
  
  reservaViaje(viajeId: string | undefined) {
    const uid = sessionStorage.getItem('uid');
    if (!uid) {
      this.mostrarToast('No se ha encontrado el UID del usuario');
      return;
    }
  
    if (!viajeId) {
      this.mostrarToast('ID de viaje no disponible');
      return;
    }
  
    if (this.numeroAcompanantes < 0 || this.numeroAcompanantes > 3) {
      this.mostrarToast('Número de acompañantes no válido');
      return;
    }
  
    const viaje = this.viajesDisponibles.find(v => v.id === viajeId);
  
    if (!viaje) {
      this.mostrarToast('Viaje no encontrado');
      return;
    }
  
    // Verificar si el pasajero ya ha reservado este viaje
    if (viaje.pasajeros.includes(uid)) {
      this.mostrarToast('Ya has reservado este viaje anteriormente');
      return;
    }
  
    const asientosNecesarios = this.numeroAcompanantes + 1;
    if (viaje.asientosDisponibles >= asientosNecesarios) {
      const nuevosAsientos = viaje.asientosDisponibles - asientosNecesarios;
      if (viaje.id) {
        this.viajeService.actualizarAsientosYPasajeros(viaje.id, nuevosAsientos, uid).then(() => {
          this.mostrarToast('Reserva realizada exitosamente');
          if (nuevosAsientos === 0) {
            this.viajeService.actualizarEstadoViaje(viaje.id!, 'completado').then(() => {
              this.mostrarToast('El viaje se ha completado');
            });
          }
        }).catch(error => {
          console.error('Error al realizar la reserva:', error);
          this.mostrarToast('Error al realizar la reserva');
        });
      } else {
        this.mostrarToast('ID de viaje es inválido');
      }
    } else {
      this.mostrarToast('No hay suficientes asientos disponibles');
    }
  }
  
  
}


