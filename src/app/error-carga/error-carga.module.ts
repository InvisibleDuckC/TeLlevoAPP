import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ErrorCargaPageRoutingModule } from './error-carga-routing.module';

import { ErrorCargaPage } from './error-carga.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ErrorCargaPageRoutingModule
  ],
  declarations: [ErrorCargaPage]
})
export class ErrorCargaPageModule {}
