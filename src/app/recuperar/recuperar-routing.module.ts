import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecuperarPage } from './recuperar.page';

const routes: Routes = [
/*   {path: 'login', loadChildren: () => import('./login/login.module').then(m =>m.loginPageModule) },
  {path: 'restablecer',loadChildren: () => import('./recuperar/recuperar.module').then(m => m.RecuperarPageModule) },
  
  component: RecuperarPage
   */
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecuperarPageRoutingModule {}
