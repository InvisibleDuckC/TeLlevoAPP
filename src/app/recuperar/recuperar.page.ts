import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.page.html',
  styleUrls: ['./recuperar.page.scss'],
})
export class RecuperarPage {

  email: string = '';

  constructor(
    private afAuth: AngularFireAuth,
    private toastController: ToastController,
    private router: Router
  ) {}

  async recuperarContrasena() {
    if (!this.email) {
      this.mostrarToast('Por favor, ingresa tu correo electrónico');
      return;
    }

    try {
      await this.afAuth.sendPasswordResetEmail(this.email);
      this.mostrarToast('Se ha enviado un correo para restablecer la contraseña');
    } catch (error) {
      console.error('Error al enviar correo de recuperación:', error);
      this.mostrarToast('Error al enviar el correo de recuperación. Verifica el correo ingresado.');
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

  irALogin() {
    this.router.navigate(['/login']);
  }

}
