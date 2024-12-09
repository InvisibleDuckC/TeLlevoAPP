import { Component } from '@angular/core';
import { PermisosService } from '.././services/permisos.service';
import { ToastController, NavController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  email = '';
  password = '';
  nombre = '';
  apellido = '';
  carrera = '';
  sedeId: string = '';
  sedes: Observable<any[]>;

  constructor(
    private permisosService: PermisosService, // Cambiado a PermisosService
    private toastController: ToastController,
    private firestore: AngularFirestore,
    private navController: NavController
  ) {
    // Obtener la lista de sedes desde Firestore
    this.sedes = this.firestore.collection('sedes').valueChanges();
  }

  async register() {
    try {
      // Crear cuenta de usuario
      const userCredential = await this.permisosService.register(this.email, this.password);
      const uid = userCredential.user?.uid;

      if (uid) {
        // Guardar datos adicionales del usuario
        await this.permisosService.saveUserData(uid, this.nombre, this.apellido, this.carrera, this.sedeId);

        const toast = await this.toastController.create({
          message: 'Cuenta creada exitosamente',
          duration: 2000,
          color: 'success',
        });
        toast.present();

        // Redirige al usuario al login
        this.navController.navigateRoot('login');
      }
    } catch (error) {
      const toast = await this.toastController.create({
        message: 'Error: ' + (error as any).message,
        duration: 2000,
        color: 'danger',
      });
      toast.present();
    }
  }
}
