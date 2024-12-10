import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PermisosService } from '../services/permisos.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent  implements OnInit {

  constructor(
    private router:Router,
    private permisosService: PermisosService
  ) { }

  ngOnInit() {}

  irAHome(){
    this.router.navigate(['/home']);
  }
  irAPerfil(){
    this.router.navigate(['/profile']);
  }
  irACrearViaje(){
    this.router.navigate(['/crear-viaje']);
  }
  irABuscarViaje(){
    this.router.navigate(['/buscar-viaje']);
  }
  irAMisViajes(){
    this.router.navigate(['/mis-viajes']);
  }

  logout() {
    this.permisosService.logout();
  }

}
