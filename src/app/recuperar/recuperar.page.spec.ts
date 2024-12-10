import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { RecuperarPage } from './recuperar.page';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';

describe('RecuperarPage', () => {
  let component: RecuperarPage;
  let fixture: ComponentFixture<RecuperarPage>;
  let alertControllerSpy: jasmine.SpyObj<AlertController>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    alertControllerSpy = jasmine.createSpyObj('AlertController', ['create']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      declarations: [RecuperarPage],
      imports: [IonicModule.forRoot(), RouterTestingModule],
      providers: [
        { provide: AlertController, useValue: alertControllerSpy },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RecuperarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show error alert if usuario is empty', async () => {
    component.usuario = '';
    const alertSpy = jasmine.createSpyObj('HTMLIonAlertElement', ['present']);
    alertControllerSpy.create.and.returnValue(Promise.resolve(alertSpy));

    await component.recuperarContrasena();

    expect(alertControllerSpy.create).toHaveBeenCalledWith({
      header: 'Error',
      message: 'Por favor, ingrese un usuario válido.',
      buttons: ['OK']
    });
    expect(alertSpy.present).toHaveBeenCalled();
    expect(routerSpy.navigate).not.toHaveBeenCalled();
  });

  it('should show success alert and navigate if usuario is provided', async () => {
    component.usuario = 'testuser';
    const alertSpy = jasmine.createSpyObj('HTMLIonAlertElement', ['present']);
    alertControllerSpy.create.and.returnValue(Promise.resolve(alertSpy));

    await component.recuperarContrasena();

    expect(alertControllerSpy.create).toHaveBeenCalledWith({
      header: 'Éxito',
      message: `Solicitud de recuperación de contraseña enviada para el usuario: ${component.usuario}`,
      buttons: ['OK']
    });
    expect(alertSpy.present).toHaveBeenCalled();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
  });
});
