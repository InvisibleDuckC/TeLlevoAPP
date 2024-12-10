import { Component, ElementRef, ViewChildren, ViewChild, OnInit} from '@angular/core';
import type { Animation } from '@ionic/angular';
import { AnimationController,  } from '@ionic/angular';
import { FirestoreService } from '../services/firestore.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {

  @ViewChild('titulo', { read: ElementRef }) titulo: ElementRef<HTMLIonTitleElement> | undefined;

  private animation: Animation | undefined;
  
  user: any;

  sedes: any = [];

  rol: 'chofer' | 'pasajero' = 'chofer';

  solicitud = false;

  constructor(
    private router:Router,
    private animationCtrl: AnimationController,
    private firestoreService: FirestoreService,
  ) {
    
  }

  ngOnInit() {
    this.firestoreService.getSedes().subscribe(
      (data) => {
        this.sedes = data;
      },
      (error) => {
        console.error('Error al obtener las sedes:', error);
      }
    );
    const userData = localStorage.getItem('userData');
  
    if (userData) {
      this.user = JSON.parse(userData);
      console.log('Usuario cargado:', this.user);
    } else {
      console.warn('No hay datos en LocalStorage');
    }
    console.log(this.user);

  }

  ngAfterViewInit() {
    if (this.titulo) {
      this.animation = this.animationCtrl.create()
        .addElement(this.titulo.nativeElement)
        .duration(2500)
        .iterations(Infinity)
        .keyframes([
          { offset: 0, opacity: '0.35' },
          { offset: 0.5, opacity: '1' },
          { offset: 1, opacity: '0.35' },
        ]);
        
      this.animation.play();
    }
  }

  guardarEnLocalStorage() {
    localStorage.setItem('userData', JSON.stringify(this.user));
  }
  
  cargarDesdeLocalStorage() {
    const data = localStorage.getItem('userData');
    
    // Comprobamos si hay datos almacenados
    if (data) {
      try {
        this.user = JSON.parse(data);  // Intentamos parsear los datos
      } catch (e) {
        console.error('Error al parsear los datos de LocalStorage:', e);
      }
    } else {
      console.log('No hay datos en LocalStorage');
    }
  }
  
  limpiarLocalStorage() {
    localStorage.removeItem('userData');
    console.log('Datos eliminados de localStorage');
  }

  cambiarEstado(){
    if (this.solicitud) {
      this.solicitud = false;
    } else{
      this.solicitud = true;
    }
  }

  continuar() {
    if (this.rol === 'chofer') {
      this.router.navigate(['/crear-viaje']);
    } else {
      this.router.navigate(['/buscar-viaje']);
    }
  }

}
