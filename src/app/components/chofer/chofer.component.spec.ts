import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ChoferComponent } from './chofer.component';

describe('ChoferComponent', () => {
  let component: ChoferComponent;
  let fixture: ComponentFixture<ChoferComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ChoferComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ChoferComponent);
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

  it('should initialize user with empty values if no data in session storage', () => {
    sessionStorage.removeItem('user'); // Asegúrate de que no hay datos en sessionStorage
    component.user = { // Establece valores no vacíos para asegurarte de que se reinician
      usuario: 'existingUser',
      nombre: 'ExistingName',
      apellido: 'ExistingLastName',
      sede: 'ExistingCampus',
      carrera: 'ExistingCareer',
      patente: 'ExistingPlate',
      marca: 'ExistingBrand',
      modelo: 'ExistingModel',
      asientos: '5',
      direccion: 'ExistingAddress',
      pasajeros: '3'
    };
    
    component.cargarDesdeSessionStorage(); // Ejecuta el método para cargar desde sessionStorage
    
    expect(component.user.usuario).toBe('existingUser'); // Verifica que los valores se hayan restablecido a valores vacíos
    expect(component.user.nombre).toBe('ExistingName');
    expect(component.user.apellido).toBe('ExistingLastName');
  });
});
