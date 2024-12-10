import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';  // Asegúrate de importar IonicModule
import { FooterComponent } from '../footer/footer.component';

@NgModule({
  declarations: [
    FooterComponent
  ],
  imports: [
    CommonModule,
    IonicModule  // Asegúrate de incluir IonicModule aquí
  ],
  exports: [
    FooterComponent
  ]
})
export class SharedModule { }