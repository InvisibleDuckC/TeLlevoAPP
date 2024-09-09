import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.page.html',
  styleUrls: ['./recuperar.page.scss'],
})
export class RecuperarPage implements OnInit {

  usuario: string = '';

  constructor(private router: Router, private alertController: AlertController) {

  }

  async recuperarContrasena() {
    if (!this.usuario) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Por favor, ingrese un usuario válido.',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }
    const alert = await this.alertController.create({
      header: 'Éxito',
      message: `Solicitud de recuperación de contraseña enviada para el usuario: ${this.usuario}`,
      buttons: ['OK']
    });
    
    await alert.present();
      
    this.router.navigate(['/login']);

  }

  ngOnInit() {
  }

}
