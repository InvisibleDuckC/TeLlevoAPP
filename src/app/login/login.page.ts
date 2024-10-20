import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  user={
    usuario:"",
    password:""
  }

  constructor(private activeroute: ActivatedRoute, private router:Router) {
    //this.location = location;
    this.activeroute.queryParams.subscribe(params => {
      if(this.router.getCurrentNavigation()!.extras.state){
        console.log(this.router.getCurrentNavigation()!.extras.state!['user']);
        this.user = this.router.getCurrentNavigation()!.extras.state!['user'];
      }
    });
  }

  ngOnInit() {
  }

  ingresar(){
    // Se declara e instancia un elemento de tipo NavigationExtras
    let navigationExtras: NavigationExtras = {
      state: {
        user: this.user // Al estado se asignamos un objeto con clave y valor
      }
    };
    this.router.navigate(['/home'],navigationExtras); // navegamos hacia el Home y enviamos información adicional
  }

  validarLogin(){
    if(this.user.usuario.length >= 3 && this.user.usuario.length <= 10 && this.user.password.length == 4 && this.user.password.match(/^\d{4}$/)){
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
