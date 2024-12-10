import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PasajeroComponent } from './pasajero.component';

describe('PasajeroComponent', () => {
  let component: PasajeroComponent;
  let fixture: ComponentFixture<PasajeroComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PasajeroComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PasajeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  beforeEach(() => {
    sessionStorage.clear(); // Limpia sessionStorage antes de cada prueba
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

  it('should initialize user with default values if no data in session storage', () => {
    sessionStorage.removeItem('user'); // Asegura que no hay datos en sessionStorage
    component.cargarDesdeSessionStorage(); // Ejecuta el método para cargar desde sessionStorage
    
    expect(component.user.usuario).toBe(''); // Verifica que los valores se hayan restablecido
    expect(component.user.nombre).toBe('');
    expect(component.user.patente).toBe('');
    expect(component.user.apellido).toBe(''); // Verifica más valores según sea necesario
  });
});
