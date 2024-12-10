import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { PermisosService } from '../services/permisos.service';
import { FirestoreService } from '../services/firestore.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email: string = '';
  password: string = '';
  errorMessage: string = '';


  constructor(
    private activeroute: ActivatedRoute,
    private router:Router,
    private permisosService: PermisosService,
    private firestoreService: FirestoreService,
    private toastController: ToastController
  ) {  }

  ngOnInit() {
  }

  login() {
    this.permisosService.login(this.email, this.password).catch((error) => {
      this.errorMessage = 'Error: ' + error.message;
    });
  }

  recuperarContrasena(){
    this.router.navigate(['/recuperar'])
  }

  crearCuenta(){
    this.router.navigate(['/register'])
  }
}
