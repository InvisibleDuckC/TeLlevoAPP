import { TestBed } from '@angular/core/testing';
import { PermisosService } from './permisos.service';

describe('PermisosService', () => {
  let service: PermisosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PermisosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should login successfully with valid credentials', () => {
    service.login_user('luz', '2345');
    expect(service.isLogged()).toBeTrue();
    expect(service.usuario).toBe('luz');

    service.login_user('rod', '1234');
    expect(service.isLogged()).toBeTrue();
    expect(service.usuario).toBe('rod');
  });

  it('should not login with invalid credentials', () => {
    service.login_user('invalid', 'wrongpassword');
    expect(service.isLogged()).toBeFalse();
    expect(service.usuario).toBe('');
  });

  it('should logout user correctly', () => {
    // Simula que el usuario inició sesión
    service.login_user('luz', '2345');
    expect(service.isLogged()).toBeTrue();

    // Llama al método de logout
    service.logout_user();
    expect(service.isLogged()).toBeFalse();
    expect(service.usuario).toBe('luz'); // El usuario permanece pero el estado de login cambia
  });
});
