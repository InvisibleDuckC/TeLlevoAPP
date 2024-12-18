import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfilePageRoutingModule } from './profile-routing.module';

import { ProfilePage } from './profile.page';
import { PasajeroComponent } from '../components/pasajero/pasajero.component';
import { ChoferComponent } from '../components/chofer/chofer.component';
import { SharedModule } from '../shared/shared.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfilePageRoutingModule,
    SharedModule,
    MatProgressSpinnerModule
  ],
  declarations: [ProfilePage,PasajeroComponent,ChoferComponent]
})
export class ProfilePageModule {}
