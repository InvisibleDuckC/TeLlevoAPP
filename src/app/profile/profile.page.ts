import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Component, ElementRef, ViewChildren, ViewChild, OnInit} from '@angular/core';
import type { Animation } from '@ionic/angular';
import { AnimationController,  } from '@ionic/angular';

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
  @ViewChild('escuela_', { read: ElementRef }) escuela_: ElementRef<HTMLIonInputElement> | undefined;
  @ViewChild('carrera_', { read: ElementRef }) carrera_: ElementRef<HTMLIonInputElement> | undefined;

  
  private animation: Animation | undefined;
  private animation_nombre: Animation | undefined;

  user = {usuario: '', password: '',nombre: "", apellido: "", sede:"",escuela:"",carrera:""};


  constructor(private activeroute: ActivatedRoute, private router:Router, private alertController: AlertController,private animationCtrl: AnimationController) {
    this.activeroute.queryParams.subscribe(params => {
      if(this.router.getCurrentNavigation()!.extras.state){
        console.log(this.router.getCurrentNavigation()!.extras.state!['user']);
        this.user = this.router.getCurrentNavigation()!.extras.state!['user'];
      }
    });
   }

  ngOnInit() {
  }

  ngAfterViewInit() {
    if (this.titulo) {
      this.animation = this.animationCtrl
        .create()
        .addElement(this.titulo.nativeElement)
        .duration(2500)
        .iterations(Infinity)
        .keyframes([
          { offset: 0, transform: 'translate(0%)', opacity: '0.2' },
          { offset: 0.5, transform: 'translate(50%)', opacity: '1' },
          { offset: 1,  transform: 'translate(100%)', opacity: '0.2' },
        ]);
        
      this.animation.play();
    }
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Sus datos:',
      subHeader: `Su nombre es: ${this.user.nombre} ${this.user.apellido}`,
      message: `Tu sede: ${this.user.sede}, tu carrera: ${this.user.carrera}`,
      buttons: ['Ok'],
    });

    await alert.present();
  }

  limpiar(){
    //this.location.reload();
    this.user.nombre = "";
    this.user.apellido = "";

    if(this.nombre_ && this.apellido_ && this.sede_ && this.escuela_ && this.carrera_){
      this.animation_nombre =  this.animationCtrl.create()
      .addElement(this.nombre_.nativeElement)
      .addElement(this.apellido_.nativeElement)
      .addElement(this.sede_.nativeElement)
      .addElement(this.escuela_.nativeElement)
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
    // Se declara e instancia un elemento de tipo NavigationExtras
    let navigationExtras: NavigationExtras = {
      state: {
        user: this.user, // Al estado se asignamos un objeto con clave y valor
      }
    };
    this.router.navigate(['/home'],navigationExtras); // navegamos hacia el Home y enviamos información adicional
  }
}
