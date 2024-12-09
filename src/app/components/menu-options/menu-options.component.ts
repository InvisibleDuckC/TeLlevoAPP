import { Component, OnInit } from '@angular/core';
import { PermisosService } from 'src/app/services/permisos.service';

@Component({
  selector: 'app-menu-options',
  templateUrl: './menu-options.component.html',
  styleUrls: ['./menu-options.component.scss'],
})
export class MenuOptionsComponent {

  constructor(private permisosService: PermisosService) {}

  logout() {
    this.permisosService.logout();
  }

}
