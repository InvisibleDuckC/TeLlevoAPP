import { Component, ElementRef, ViewChildren, ViewChild, OnInit} from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import type { Animation } from '@ionic/angular';
import { AnimationController,  } from '@ionic/angular';
import { FirestoreService } from '../services/firestore.service';
import { PermisosService } from '../services/permisos.service';
import { MenuOptionsComponent } from '../components/menu-options/menu-options.component';
import { PopoverController } from '@ionic/angular';



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

  solicitud = false;

  constructor(
    private activeroute: ActivatedRoute,
    private router:Router,
    private animationCtrl: AnimationController,
    private firestoreService: FirestoreService,
    private permisosService: PermisosService,
    private popoverController: PopoverController
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

  irAPerfil(){
    // Se declara e instancia un elemento de tipo NavigationExtras
    let navigationExtras: NavigationExtras = {
      state: {
        user: this.user, // Al estado se asignamos un objeto con clave y valor
      }
    };
    this.router.navigate(['/profile'],navigationExtras); // navegamos hacia el Perfil y enviamos información adicional
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

  logout() {
    this.permisosService.logout();
  }

  async openMenu(ev: Event) {
    const popover = await this.popoverController.create({
      component: MenuOptionsComponent,
      event: ev,
      translucent: true,
    });
    await popover.present();
  }

}
