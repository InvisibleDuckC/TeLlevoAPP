import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginPage } from './login.page';
import { Router } from '@angular/router';
import { PermisosService } from '../permisos.service';
import { FirestoreService } from '../services/firestore.service';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;
  let router: jasmine.SpyObj<Router>;
  let permisosService: jasmine.SpyObj<PermisosService>;
  let firestoreService: jasmine.SpyObj<FirestoreService>;

  beforeEach(async () => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    const permisosServiceSpy = jasmine.createSpyObj('PermisosService', ['login_user']);
    const firestoreServiceSpy = jasmine.createSpyObj('FirestoreService', ['userExists', 'getUserData']);

    await TestBed.configureTestingModule({
      declarations: [LoginPage],
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: PermisosService, useValue: permisosServiceSpy },
        { provide: FirestoreService, useValue: firestoreServiceSpy },
        { provide: ActivatedRoute, useValue: { params: of({}) } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    permisosService = TestBed.inject(PermisosService) as jasmine.SpyObj<PermisosService>;
    firestoreService = TestBed.inject(FirestoreService) as jasmine.SpyObj<FirestoreService>;

    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should call ingresar() and navigate to home', () => {
    spyOn(component, 'login'); // Spy on the login method called inside ingresar()
    component.ingresar();
    expect(router.navigate).toHaveBeenCalledWith(['/home']);
    expect(component.login).toHaveBeenCalled();
  });

  it('should validate login correctly with valid user data', () => {
    component.user = { usuario: 'validUser', password: '1234' };
    permisosService.login_user.and.callFake(() => true);
    spyOn(component, 'ingresar'); // Spy on the ingresar method called inside validarLogin()
    component.validarLogin();
    expect(permisosService.login_user).toHaveBeenCalledWith('validUser', '1234');
    expect(component.ingresar).toHaveBeenCalled();
  });

  it('should navigate to recuperar page on recuperarContrasena()', () => {
    component.recuperarContrasena();
    expect(router.navigate).toHaveBeenCalledWith(['/recuperar']);
  });
});
