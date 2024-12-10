import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Component, ElementRef, ViewChildren, ViewChild, OnInit} from '@angular/core';
import type { Animation } from '@ionic/angular';
import { AnimationController,  } from '@ionic/angular';

import { FirestoreService } from '../services/firestore.service';
import { PermisosService } from '../services/permisos.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  @ViewChild('titulo', { read: ElementRef }) titulo: ElementRef<HTMLIonTitleElement> | undefined;
  @ViewChild('nombre_', { read: ElementRef }) nombre_: ElementRef<HTMLIonInputElement> | undefined;
  @ViewChild('apellido_', { read: ElementRef }) apellido_: ElementRef<HTMLIonInputElement> | undefined;
  @ViewChild('sede_', { read: ElementRef }) sede_: ElementRef<HTMLIonInputElement> | undefined;
  @ViewChild('carrera_', { read: ElementRef }) carrera_: ElementRef<HTMLIonInputElement> | undefined;

  
  private animation: Animation | undefined;
  private animation_nombre: Animation | undefined;

  sedes: any = [];

  usuario: any;
  userData: any = {}; // Datos del usuario
  choferData: any = {}; // Datos del chofer
  pasajeroData: any = {}; // Datos del pasajero
  uid: string | null = null; // UID del usuario logueado
  loading: boolean = true; // Indicador de carga

  selectedSegment: string = 'pasajero';

  constructor(
    private activeroute: ActivatedRoute,
    private router:Router,
    private alertController: AlertController,
    private animationCtrl: AnimationController,
    private firestoreService: FirestoreService,
    private firestore: AngularFirestore,
    private permisosService: PermisosService
  ) { }

  ngOnInit() {
    const user = JSON.parse(localStorage.getItem('userData') || '{}');
    this.uid = this.permisosService.getUid();
    console.log(user);
    console.log(this.uid);

    // Obtener la lista de sedes desde Firestore
    this.sedes = this.firestore.collection('sedes').valueChanges();

    if (this.uid) {
      // Obtener los datos del usuario
      this.permisosService.getUserData(this.uid).subscribe((data) => {
        if (data) {
          this.userData = data;
          this.loading = false;
        } else {
          console.error('No se encontraron datos del usuario');
        }
      });

      // Obtener los datos del chofer
      this.permisosService.getChoferData(this.uid)
      .then(data => {
        this.choferData = data || {}; // Asignamos los datos al objeto
      })
      .catch(error => {
        console.error('Error al obtener los datos del chofer:', error);
      });

      // Obtener los datos del pasajero
      this.permisosService.getPasajeroData(this.uid)
      .then(data => {
        this.pasajeroData = data || {}; // Asignamos los datos al objeto
      })
      .catch(error => {
        console.error('Error al obtener los datos del pasajero:', error);
      });
    }
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

  async presentAlert() {
    const alert = await this.alertController.create({
      message: "Datos guardados",
      buttons: ['Ok'],
    });

    await alert.present();
  }

  limpiar(){
    //this.location.reload();
    this.usuario.nombre = "";
    this.usuario.apellido = "";
    this.usuario.sede = "";
    this.usuario.carrera = "";

    if(this.nombre_ && this.apellido_ && this.sede_ && this.carrera_){
      this.animation_nombre =  this.animationCtrl.create()
      .addElement(this.nombre_.nativeElement)
      .addElement(this.apellido_.nativeElement)
      .addElement(this.sede_.nativeElement)
      .addElement(this.carrera_.nativeElement)
      .duration(1000)
      .iterations(1)
      .keyframes([
        { offset: 0, transform: 'translate(0%)'},
        { offset: 0.5,  transform: 'translate(1%)'},
/*         { offset: 0.6, transform: 'translate(0.5%)'}, */
        { offset: 1,  transform: 'translate(0%)'},
      ]);
      this.animation_nombre.play();
    }
  }

  irAHome(){

    this.router.navigate(['/home']); // navegamos hacia el Home
  }

  segmentChanged(event: any) {
    this.selectedSegment = event.detail.value;
  }

  // Guardar datos en localStorage
  guardarEnLocalStorage() {
    localStorage.setItem('userData', JSON.stringify(this.usuario));
    this.presentAlert();
  }
  
  // Obtener datos desde localStorage
  cargarDesdeLocalStorage() {
    const userData = localStorage.getItem('userData');
    if (userData) {
      this.usuario = JSON.parse(userData);
    }
  }
    
  // Limpiar localStorage
  limpiarLocalStorage() {
    localStorage.removeItem('userData');
    console.log('Datos eliminados de localStorage');
  }

  guardarDatosChofer(choferData: any) {
    if (this.uid) {
      // Guardar los datos del chofer
      this.permisosService.updateChoferData(this.uid, choferData);
    }
  }
  
  guardarDatosPasajero(pasajeroData: any) {
    if (this.uid) {
      // Guardar los datos del pasajero
      this.permisosService.updatePasajeroData(this.uid, pasajeroData);
    }
  }
  
    // Guardar los datos modificados
    saveUserData() {
      const uid = sessionStorage.getItem('uid');
      if (uid) {
        // Actualizar los datos en Firestore
        this.permisosService.updateUserData(uid, this.userData).then(() => {
          console.log('Datos actualizados en Firestore');
          
          // Actualizar los datos en localStorage
          localStorage.setItem('userData', JSON.stringify(this.userData));
          console.log('Datos actualizados en LocalStorage');
        }).catch(error => {
          console.error('Error al actualizar los datos:', error);
        });
      }
    }

}
