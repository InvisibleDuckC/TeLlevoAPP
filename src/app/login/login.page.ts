import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { PermisosService } from '../services/permisos.service';

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
    private permisosService: PermisosService
  ) {  }

  ngOnInit() {
  }

  login() {
    this.permisosService.login(this.email, this.password).catch((error) => {
      this.errorMessage = 'Error: ' + error.message;
    });
  }

  crearCuenta(){
    this.router.navigate(['/register'])
  }

  irARecuperarContrasena() {
    this.router.navigate(['/recuperar']);
  }
}
