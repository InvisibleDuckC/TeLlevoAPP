import { Component, OnInit } from '@angular/core';
import { ViajeService } from '../services/viaje.service';
import { Viaje } from '../models/viaje';
import { PermisosService } from '../services/permisos.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ToastController } from '@ionic/angular';
import { Geolocation } from '@capacitor/geolocation';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-crear-viaje',
  templateUrl: './crear-viaje.page.html',
  styleUrls: ['./crear-viaje.page.scss'],
})
export class CrearViajePage {

  viaje: Viaje = {
    choferId: '', // Esto se llenará con el ID del usuario autenticado
    origen: '',
    destino: '',
    fechaHora: '',
    asientosDisponibles: 0,
    pasajeros: [],
    estado: 'abierto',
  };

  constructor(
    private viajeService: ViajeService,
    private permisosService: PermisosService,
    private firestore: AngularFirestore,
    private toastController: ToastController,
    private http: HttpClient
  ) {}

  ngOnInit() {
    const uid = sessionStorage.getItem('uid');
    if (!uid) {
      console.error('No se ha encontrado el UID del usuario');
      return;
    }

    this.cargarDatosPasajero(uid);
    this.cargarDatosUsuario(uid);
    this.cargarDatosChofer(uid);
  }

  async cargarDatosPasajero(uid: string) {
    try {
      const doc = await this.firestore.collection('pasajeros').doc(uid).get().toPromise();
      if (!doc) {
        console.error('No se obtuvo ningún documento para pasajero');
        return;
      }

      if (doc.exists) {
        const data = doc.data() as any; // Castea a 'any' para evitar errores de indexación
        if (data && data['direccion']) {
          this.viaje.origen = data['direccion'];
        }
      } else {
        console.log('El documento de pasajero no existe');
      }
    } catch (error) {
      console.error('Error al cargar datos de pasajero:', error);
    }
  }

  async cargarDatosUsuario(uid: string) {
    try {
      const doc = await this.firestore.collection('usuarios').doc(uid).get().toPromise();
      if (!doc) {
        console.error('No se obtuvo ningún documento para usuario');
        return;
      }

      if (doc.exists) {
        const data = doc.data() as any;
        if (data && data['sedeId']) {
          this.viaje.destino = data['sedeId'];
        }
      } else {
        console.log('El documento de usuario no existe');
      }
    } catch (error) {
      console.error('Error al cargar datos de usuario:', error);
    }
  }

  async cargarDatosChofer(uid: string) {
    try {
      const doc = await this.firestore.collection('choferes').doc(uid).get().toPromise();
      if (!doc) {
        console.error('No se obtuvo ningún documento para chofer');
        return;
      }

      if (doc.exists) {
        const data = doc.data() as any;
        if (data && data['asientos']) {
          this.viaje.asientosDisponibles = Number(data['asientos']);

        }
      } else {
        console.log('El documento de chofer no existe');
      }
    } catch (error) {
      console.error('Error al cargar datos de chofer:', error);
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

  crearViaje() {
    const uid = sessionStorage.getItem('uid');  

    if (!this.viaje.origen || !this.viaje.destino || !this.viaje.fechaHora || this.viaje.asientosDisponibles <= 0) {
      this.mostrarToast('Todos los campos son obligatorios y deben ser válidos');
      return;
    }

    if (uid !== null) {
      this.viaje.choferId = uid; 
    } else {
      console.error('No se ha encontrado el UID del usuario');
      return;
    }

    this.viajeService.addTravel(this.viaje).then(() => {
      this.mostrarToast('Viaje creado exitosamente');
    }).catch((error) => {
      console.error('Error creando viaje:', error);
      this.mostrarToast('Error al crear el viaje. Intenta nuevamente.');
    });
  }

  formatearFecha(event: any) {
    const fecha = new Date(event.detail.value);
    this.viaje.fechaHora = fecha.toISOString(); 
  }

  async obtenerUbicacionActual() {
    try {
      const coordinates = await Geolocation.getCurrentPosition();
      const { latitude, longitude } = coordinates.coords;
      const direccion = await this.geocodificarInverso(latitude, longitude);
      this.mostrarToast(`Dirección: ${direccion}`);
      this.viaje.origen = direccion;
      // Asignar a this.viaje.origen = direccion; si lo deseas
    } catch (error) {
      console.error('Error al obtener la dirección:', error);
      this.mostrarToast('No se pudo obtener la dirección.');
    }
  }

  geocodificarInverso(lat: number, lon: number): Promise<string> {
    const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`;
    return this.http.get<any>(url).toPromise().then(data => {
      if (data && data.display_name) {
        // display_name contiene la dirección completa en OpenStreetMap
        return data.display_name;
      } else {
        throw new Error('No se encontró la dirección en la respuesta');
      }
    });
  }

}
