import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Viaje } from '../models/viaje';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class ViajeService {
  constructor(private firestore: AngularFirestore) {}

  // Metodo para agregar un nuevo viaje
  addTravel(viaje: Viaje): Promise<void> {
    const id = this.firestore.createId();
    return this.firestore.collection('viajes').doc(id).set({
      ...viaje,
      id: id,
    });
  }

  // Obtener todos los viajes disponibles
  getViajesDisponibles(): Observable<Viaje[]> {
    return this.firestore.collection('viajes', ref => ref.where('estado', '==', 'abierto'))
      .snapshotChanges()
      .pipe(map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Viaje;
        const id = a.payload.doc.id;
        return {...data, id};
      })));
  }

  // Actualizar los asientos disponibles de un viaje
  actualizarAsientos(id: string, nuevosAsientos: number): Promise<void> {
    return this.firestore.collection('viajes').doc(id).update({ asientosDisponibles: nuevosAsientos });
  }

  actualizarEstadoViaje(viajeId: string, nuevoEstado: string) {
    return this.firestore.collection('viajes').doc(viajeId).update({
      estado: nuevoEstado
    });
  }

  actualizarAsientosYPasajeros(id: string, nuevosAsientos: number, uidPasajero: string): Promise<void> {
    // Uso de transaction para asegurar consistencia
    return this.firestore.firestore.runTransaction(async (transaction) => {
      const docRef = this.firestore.collection('viajes').doc(id).ref;
      const doc = await transaction.get(docRef);
  
      if (!doc.exists) {
        throw new Error('Viaje no encontrado');
      }
  
      const data = doc.data() as Viaje;
      if (!data.pasajeros) {
        data.pasajeros = [];
      }
  
      // Añadir el uid del pasajero a la lista si no existe
      if (!data.pasajeros.includes(uidPasajero)) {
        data.pasajeros.push(uidPasajero);
      } else {
        throw new Error('El pasajero ya reservó este viaje');
      }
  
      // Actualizar asientos
      data.asientosDisponibles = nuevosAsientos;
  
      transaction.update(docRef, {
        asientosDisponibles: nuevosAsientos,
        pasajeros: data.pasajeros
      });
    });
  }

  // Viajes donde el usuario es chofer
  getViajesComoChofer(uid: string): Observable<Viaje[]> {
    return this.firestore.collection('viajes', ref => ref.where('choferId', '==', uid))
      .snapshotChanges()
      .pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data() as Viaje;
          const id = a.payload.doc.id;
          return {...data, id};
        }))
      );
  }

  // Viajes donde el usuario figura como pasajero
  getViajesComoPasajero(uid: string): Observable<Viaje[]> {
    return this.firestore.collection('viajes', ref => ref.where('pasajeros', 'array-contains', uid))
      .snapshotChanges()
      .pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data() as Viaje;
          const id = a.payload.doc.id;
          return {...data, id};
        }))
      );
  }
  
}