import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PermisosService {
  logStatus : boolean = false
  usuario = '';
  userData: any = null; // Objeto para almacenar los datos del usuario


  constructor(
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private router: Router
  ) { }

  // Método para obtener el listado de sedes
  getSedes(): Observable<any[]> {
    return this.firestore.collection('sedes').valueChanges({ idField: 'id' });
  }

  // Método para crear una cuenta
  register(email: string, password: string) {
    return this.afAuth.createUserWithEmailAndPassword(email, password);
  }

  // Método para guardar datos adicionales del usuario
  saveUserData(uid: string, nombre: string, apellido: string, carrera: string, sedeId: string) {
    const userRef = this.firestore.collection('usuarios').doc(uid);
    return userRef.set({
      nombre,
      apellido,
      carrera,
      sedeId,
    });
  }

  // Método para obtener los datos del usuario
  getUserData(uid: string) {
    return this.firestore.collection('usuarios').doc(uid).valueChanges();
  }
  // Método para obtener los datos del chofer
  getChoferData(uid: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.firestore
        .collection('choferes') // Colección choferes en Firestore
        .doc(uid) // Documento identificado por el UID del usuario
        .get()
        .subscribe(doc => {
          if (doc.exists) {
            resolve(doc.data()); // Devolvemos los datos del chofer
          } else {
            reject('No se encontró el documento del chofer.');
          }
        }, error => {
          reject(error);
        });
    });
  }
  
  // Método para obtener los datos del pasajero
  getPasajeroData(uid: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.firestore
        .collection('pasajeros') // Asegúrate de que esta sea la colección correcta en Firestore
        .doc(uid) // El UID del usuario que se utiliza como ID del documento
        .get()
        .subscribe(doc => {
          if (doc.exists) {
            resolve(doc.data()); // Devolvemos los datos del pasajero
          } else {
            reject('No se encontró el documento del pasajero.');
          }
        }, error => {
          reject(error);
        });
    });
  }

  updateUserData(uid: string, data: any) {
    const userRef = this.firestore.collection('usuarios').doc(uid);
    return userRef.update(data); // Actualiza los datos del usuario en Firestore
  }

  updateChoferData(uid: string, choferData: any) {
    const docRef = this.firestore.collection('choferes').doc(uid);
    docRef.get().toPromise().then(doc => {
      // Verificamos si doc no es undefined y existe
      if (doc && doc.exists) {
        docRef.update(choferData);
      } else {
        docRef.set(choferData); // Si el documento no existe, lo creamos
      }
    }).catch(error => {
      console.error('Error al actualizar los datos de chofer:', error);
    });
  }
  
  updatePasajeroData(uid: string, pasajeroData: any) {
    const docRef = this.firestore.collection('pasajeros').doc(uid);
    docRef.get().toPromise().then(doc => {
      // Verificamos si doc no es undefined y existe
      if (doc && doc.exists) {
        docRef.update(pasajeroData);
      } else {
        docRef.set(pasajeroData); // Si el documento no existe, lo creamos
      }
    }).catch(error => {
      console.error('Error al actualizar los datos de pasajero:', error);
    });
  }
  
//Modifica status para Guard
//this.logStatus = true;
  // Método para iniciar sesión
  login(email: string, password: string) {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        const uid = result.user?.uid;
        this.logStatus = true;
        
        if (!uid) {
          console.error('UID no encontrado');
          throw new Error('UID no encontrado');
        }
  
        // Guardar UID en sessionStorage
        sessionStorage.setItem('uid', uid);
  
        // Cargar datos desde Firestore
        return this.firestore
          .collection('usuarios')
          .doc(uid)
          .get()
          .toPromise()
          .then((doc) => {
            if (doc && doc.exists) {
              const userData = doc.data();
              // Guardar datos del usuario en localStorage
              localStorage.setItem('userData', JSON.stringify(userData));
              console.log('Datos del usuario cargados correctamente:', userData);
            } else {
              console.warn('No se encontraron datos del usuario en Firestore');
              localStorage.removeItem('userData');
            }
            // Redirigir al home
            this.router.navigate(['/home']);
            })
          .catch((error) => {
            console.error('Error al obtener datos de Firestore:', error);
          });
      })
      .catch((error) => {
        console.error('Error al iniciar sesión:', error.message);
        throw error;
      });
  }
  
  

  // Método para cargar los datos del usuario desde Firestore
  private loadUserData(uid: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.firestore
        .collection('usuarios') // Asumiendo que los datos de los usuarios están en la colección 'usuarios'
        .doc(uid)
        .get()
        .subscribe(doc => {
          if (doc.exists) {
            // Obtener los datos del documento y devolverlos
            resolve(doc.data());
          } else {
            reject('Documento no encontrado');
          }
        }, error => {
          reject(error);
        });
    });
  }

  // Método para obtener el UID desde sessionStorage
  getUid() {
    return sessionStorage.getItem('uid');
  }

  // Método para cerrar sesión
  logout() {
    this.afAuth.signOut().then(() => {
      sessionStorage.clear(); // Elimina UID
      localStorage.clear();  // Elimina datos de usuario
      this.logStatus = false; // Modifica status para Guard
      this.router.navigate(['/login']); // Redirige al login
    }).catch((error) => {
      console.error('Error al cerrar sesión:', error);
    });
  }

  getCurrentUser() {
    return this.afAuth.user;
  }

  //Funcion para consulta de Guard
  isLogged() {
    return this.logStatus;
  }

  
}

