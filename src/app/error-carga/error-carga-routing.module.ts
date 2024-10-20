import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ErrorCargaPage } from './error-carga.page';

const routes: Routes = [
  {
    path: '',
    component: ErrorCargaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ErrorCargaPageRoutingModule {}
