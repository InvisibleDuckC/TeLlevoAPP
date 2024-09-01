 import { Component } from '@angular/core';
 import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private router: Router) {}


  irALogin(){
    // Se declara e instancia un elemento de tipo NavigationExtras
    let navigationExtras: NavigationExtras = {
      state: {
      }
    };
    this.router.navigate(['/login'],navigationExtras); // navegamos hacia el Home y enviamos información adicional
  }
}
