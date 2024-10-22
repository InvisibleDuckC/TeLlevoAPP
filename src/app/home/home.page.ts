import { Component, ElementRef, ViewChildren, ViewChild, OnInit} from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import type { Animation } from '@ionic/angular';
import { AnimationController,  } from '@ionic/angular';
import { FirestoreService } from '../services/firestore.service';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {

  @ViewChild('titulo', { read: ElementRef }) titulo: ElementRef<HTMLIonTitleElement> | undefined;

  private animation: Animation | undefined;
  
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

  constructor(
    private activeroute: ActivatedRoute,
    private router:Router,
    private animationCtrl: AnimationController,
    private firestoreService: FirestoreService
  ) 
  {
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

  irAPerfil(){
    // Se declara e instancia un elemento de tipo NavigationExtras
    let navigationExtras: NavigationExtras = {
      state: {
        user: this.user, // Al estado se asignamos un objeto con clave y valor
      }
    };
    this.router.navigate(['/profile'],navigationExtras); // navegamos hacia el Perfil y enviamos información adicional
  }

    guardarEnSessionStorage() {
      sessionStorage.setItem('user', JSON.stringify(this.user));
    }
  
    cargarDesdeSessionStorage() {
      const userData = sessionStorage.getItem('user');
      if (userData) {
        this.user = JSON.parse(userData);
      }
    }
  
    limpiarSessionStorage() {
      sessionStorage.removeItem('user');
      console.log('Datos eliminados de localStorage');
    }

}
