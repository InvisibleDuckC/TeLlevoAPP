import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { FirestoreService } from '../services/firestore.service';
import { HomePage } from './home.page';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomePage],
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
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should store user data in session storage', () => {
    component.user = {
      usuario: 'testuser',
      nombre: 'John',
      apellido: 'Doe',
      sede: 'Main Campus',
      carrera: 'Engineering',
      patente: '123-ABC',
      marca: 'Toyota',
      modelo: 'Corolla',
      asientos: '4',
      direccion: '123 Main St',
      pasajeros: '3'
    };
    component.guardarEnSessionStorage();

    const storedData = JSON.parse(sessionStorage.getItem('user') || '{}');
    expect(storedData.usuario).toBe('testuser');
    expect(storedData.nombre).toBe('John');
    expect(storedData.apellido).toBe('Doe');
  });

  it('should load user data from session storage', () => {
    const mockUserData = {
      usuario: 'testuser',
      nombre: 'Jane',
      apellido: 'Smith',
      sede: 'Downtown',
      carrera: 'Arts',
      patente: 'XYZ-987',
      marca: 'Honda',
      modelo: 'Civic',
      asientos: '5',
      direccion: '456 Elm St',
      pasajeros: '2'
    };
    sessionStorage.setItem('user', JSON.stringify(mockUserData));
    
    component.cargarDesdeSessionStorage();
    
    expect(component.user.usuario).toBe('testuser');
    expect(component.user.nombre).toBe('Jane');
    expect(component.user.apellido).toBe('Smith');
  });

  it('should navigate to profile page with user data', () => {
    const routerSpy = spyOn(component['router'], 'navigate');
    component.user = {
      usuario: 'testuser',
      nombre: 'John',
      apellido: 'Doe',
      sede: 'Main Campus',
      carrera: 'Engineering',
      patente: '123-ABC',
      marca: 'Toyota',
      modelo: 'Corolla',
      asientos: '4',
      direccion: '123 Main St',
      pasajeros: '3'
    };
    component.irAPerfil();

    expect(routerSpy).toHaveBeenCalledWith(['/profile'], {
      state: { user: component.user }
    });
  });
});
