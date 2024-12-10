import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfilePage } from './profile.page';
import { IonicModule, NavController, AlertController } from '@ionic/angular';
import { FirestoreService } from '../services/firestore.service';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('ProfilePage', () => {
  let component: ProfilePage;
  let fixture: ComponentFixture<ProfilePage>;
  let firestoreServiceMock: any;
  let alertControllerSpy: jasmine.SpyObj<AlertController>;
  let navControllerSpy: jasmine.SpyObj<NavController>;

  beforeEach(async () => {
    alertControllerSpy = jasmine.createSpyObj('AlertController', ['create']);
    navControllerSpy = jasmine.createSpyObj('NavController', ['navigateForward', 'navigateBack']);

    await TestBed.configureTestingModule({
      declarations: [ProfilePage],
      imports: [IonicModule.forRoot(), RouterTestingModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({}),
            queryParams: of({})
          }
        },
        {
          provide: FirestoreService,
          useValue: {
            userExists: jasmine.createSpy('userExists').and.returnValue(Promise.resolve(false)),
            getUserData: jasmine.createSpy('getUserData').and.returnValue(Promise.resolve(null)),
            addUser: jasmine.createSpy('addUser').and.returnValue(Promise.resolve()),
            updateUser: jasmine.createSpy('updateUser').and.returnValue(Promise.resolve())
          }
        },
        { provide: AlertController, useValue: alertControllerSpy },
        { provide: NavController, useValue: navControllerSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProfilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should clear user data on limpiar call', () => {
    // Configurar datos iniciales en el objeto user
    component.user = {
      usuario: 'testuser',
      nombre: 'Test',
      apellido: 'User',
      sede: 'Sede1',
      carrera: 'Carrera1',
      patente: 'ABC123',
      marca: 'Toyota',
      modelo: 'Corolla',
      asientos: '4',
      direccion: 'Calle Falsa 123',
      pasajeros: '3'
    };
  
    // Llamar al método limpiar
    component.limpiar();
  
    // Verificar que los campos relevantes están vacíos
    expect(component.user.nombre).toBe('');
    expect(component.user.apellido).toBe('');
    expect(component.user.sede).toBe('');
    expect(component.user.carrera).toBe('');
  });

  it('should show alert with user data on presentAlert call', async () => {
    component.user = {
      usuario: 'testuser',
      nombre: 'Test',
      apellido: 'User',
      sede: 'Sede1',
      carrera: 'Carrera1',
      patente: '',
      marca: '',
      modelo: '',
      asientos: '',
      direccion: '',
      pasajeros: ''
    };

    const alertSpy = jasmine.createSpyObj('HTMLIonAlertElement', ['present']);
    alertControllerSpy.create.and.returnValue(Promise.resolve(alertSpy));

    await component.presentAlert();

    expect(alertControllerSpy.create).toHaveBeenCalledWith({
      header: 'Sus datos:',
      subHeader: `Su nombre es: ${component.user.nombre} ${component.user.apellido}`,
      message: `Tu sede: ${component.user.sede}, tu carrera: ${component.user.carrera}`,
      buttons: ['Ok']
    });
    expect(alertSpy.present).toHaveBeenCalled();
  });
});
