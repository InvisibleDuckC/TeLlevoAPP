import { Component, ElementRef, ViewChildren, ViewChild, OnInit} from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import type { Animation } from '@ionic/angular';
import { AnimationController,  } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {

  @ViewChild('titulo', { read: ElementRef }) titulo: ElementRef<HTMLIonTitleElement> | undefined;

  private animation: Animation | undefined;
  
  user = {usuario: '', password: '',nombre: "", apellido: "", sede:"",escuela:"",carrera:""};

  constructor(private activeroute: ActivatedRoute, private router:Router,private animationCtrl: AnimationController) {
    //this.location = location;
    this.activeroute.queryParams.subscribe(params => {
      if(this.router.getCurrentNavigation()!.extras.state){
        console.log(this.router.getCurrentNavigation()!.extras.state!['user']);
        this.user = this.router.getCurrentNavigation()!.extras.state!['user'];
      }
    });
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

}
