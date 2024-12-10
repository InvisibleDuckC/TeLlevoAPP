import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfilePage } from './profile.page';
import { ChoferComponent } from '../components/chofer/chofer.component';
import { PasajeroComponent } from '../components/pasajero/pasajero.component';

const routes: Routes = [
  {
    path: '',
    component: ProfilePage,
    children:[
      {
        path:'chofer',
        component:ChoferComponent
      },
      {
        path:'pasajero',
        component:PasajeroComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfilePageRoutingModule {}
