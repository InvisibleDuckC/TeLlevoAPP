import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfilePageRoutingModule } from './profile-routing.module';

import { ProfilePage } from './profile.page';
import { PasajeroComponent } from '../components/pasajero/pasajero.component';
import { ChoferComponent } from '../components/chofer/chofer.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfilePageRoutingModule
  ],
  declarations: [ProfilePage,PasajeroComponent,ChoferComponent]
})
export class ProfilePageModule {}
