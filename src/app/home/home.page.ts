 import { Component } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {
  user = {usuario: '', password: '',nombre: "", apellido: "", sede:"",escuela:"",carrera:""};

  constructor(private activeroute: ActivatedRoute, private router:Router) {
    //this.location = location;
    this.activeroute.queryParams.subscribe(params => {
      if(this.router.getCurrentNavigation()!.extras.state){
        console.log(this.router.getCurrentNavigation()!.extras.state!['user']);
        this.user = this.router.getCurrentNavigation()!.extras.state!['user'];
      }
    });
  }

  irAPerfil(){
    // Se declara e instancia un elemento de tipo NavigationExtras
    let navigationExtras: NavigationExtras = {
      state: {
        user: this.user, // Al estado se asignamos un objeto con clave y valor
      }
    };
    this.router.navigate(['/profile'],navigationExtras); // navegamos hacia el Perfil y enviamos información adicional
  }

}
