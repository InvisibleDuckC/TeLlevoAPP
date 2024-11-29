import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Component, ElementRef, ViewChildren, ViewChild, OnInit} from '@angular/core';
import type { Animation } from '@ionic/angular';
import { AnimationController,  } from '@ionic/angular';

import { FirestoreService } from '../services/firestore.service';


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

  user = {
    usuario: '',
    nombre: "",
    apellido: "",
    sede:"",
    carrera:"",
    patente :'',
    marca:'',
    modelo:'',
    asientos:'',
    direccion :'',
    pasajeros:''
  };

  segment = "pasajero"

  constructor(
    private activeroute: ActivatedRoute,
    private router:Router,
    private alertController: AlertController,
    private animationCtrl: AnimationController,
    private firestoreService: FirestoreService
  ) { }

   ngOnInit() {
    this.firestoreService.getSedes().subscribe(
      (data) => {
        this.sedes = data;
      },
      (error) => {
        console.error('Error al obtener las sedes:', error);
      }
    );
    console.log(this.sedes);
    this.cargarDesdeSessionStorage();
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
    this.user.nombre = "";
    this.user.apellido = "";
    this.user.sede = "";
    this.user.carrera = "";

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

  onChangeSegment(event: any){
    this.segment = event.detail.value;
    console.log(this.segment);
  }

  // Guardar datos en localStorage
  guardarEnSessionStorage() {
    sessionStorage.setItem('user', JSON.stringify(this.user));
    this.presentAlert();
  }
  
  // Obtener datos desde localStorage
  cargarDesdeSessionStorage() {
    const userData = sessionStorage.getItem('user');
    if (userData) {
      this.user = JSON.parse(userData);
    }
  }
    
  // Limpiar localStorage
  limpiarSessionStorage() {
    sessionStorage.removeItem('user');
    console.log('Datos eliminados de localStorage');
  }

  async ngOnDestroy() {
    try {
      const userExists = await this.firestoreService.userExists(this.user.usuario);
      const userData = {
        usuario: this.user.usuario,
        nombre: this.user.nombre || '',
        apellido: this.user.apellido || '',
        sede:this.user.sede || '',
        carrera:this.user.carrera || '',
        patente :this.user.patente || '',
        marca:this.user.marca || '',
        modelo:this.user.modelo || '',
        asientos:this.user.asientos || '',
        direccion :this.user.direccion || '',
        pasajeros:this.user.pasajeros || ''
      };

      if (userExists) {
        // Si el usuario existe, actualizar los datos
        console.log('Usuario existe. Actualizando datos...');
        const userDoc = await this.firestoreService.getUserData(this.user.usuario);
        if (userDoc) {
          await this.firestoreService.updateUser(userDoc['id'], userData);
          console.log('Datos actualizados correctamente en Firestore');
        }
      } else {
        // Si el usuario no existe, crear un nuevo registro
        console.log('Usuario no encontrado. Creando nuevo registro...');
        await this.firestoreService.addUser(userData);
        console.log('Usuario creado correctamente en Firestore');
      }
    } catch (error) {
      console.error('Error al verificar o actualizar usuario:', error);
    }
  }
}
