import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { PermisosService } from '../permisos.service';
import { FirestoreService } from '../services/firestore.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  user={
    usuario:"luz",
    password:"2345"
  }

  constructor(
    private activeroute: ActivatedRoute,
    private router:Router,
    private permisosService: PermisosService,
    private firestoreService: FirestoreService 
  ) {

  }

  ngOnInit() {
  }

  ingresar(){
    // Se declara e instancia un elemento de tipo NavigationExtras
    const userData = { usuario: this.user.usuario };
    sessionStorage.setItem('user', JSON.stringify(userData)); 
    this.login();
    this.router.navigate(['/home']); // navegamos hacia el Home y enviamos información adicional
  }

  async login() {
    try {
      const userExists = await this.firestoreService.userExists(this.user.usuario);
      if (userExists) {
        console.log('Usuario existe. Recuperando datos...');
        
        // Obtener los datos del usuario
        const userData = await this.firestoreService.getUserData(this.user.usuario);
        
        if (userData) {
          // Guardar datos en sessionStorage
          sessionStorage.setItem('user', JSON.stringify(userData));
          // Agrega otros campos que necesites guardar

          console.log('Datos del usuario guardados en sessionStorage:', userData);
          // Aquí puedes redirigir al usuario a la página principal o donde desees
        }
      } else {
        console.error('Usuario no encontrado. Verifica tus credenciales.');
        // Mostrar un mensaje de error al usuario
      }
    } catch (error) {
      console.error('Error al verificar usuario:', error);
    }
  }

  validarLogin(){
    if(this.user.usuario.length >= 3 && this.user.usuario.length <= 10 && this.user.password.length == 4 && this.user.password.match(/^\d{4}$/)){
      this.permisosService.login_user(this.user.usuario, this.user.password)
      this.ingresar();
    }
    else{
      alert("Usuario y/o contraseña incorrectos");
    }
  }

  recuperarContrasena(){
    this.router.navigate(['/recuperar'])
  }
}
