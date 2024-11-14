import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfilePage } from './profile.page';
import { IonicModule } from '@ionic/angular';
import { FirestoreService } from '../services/firestore.service';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('ProfilePage', () => {
  let component: ProfilePage;
  let fixture: ComponentFixture<ProfilePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfilePage],
      imports: [IonicModule.forRoot(), RouterTestingModule], // Asegúrate de incluir RouterTestingModule
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            // Mock para valores necesarios en las pruebas
            params: of({}), // Simular parámetros según sea necesario
            queryParams: of({})
          }
        },
        {
          provide: FirestoreService,
          useValue: {
            // Mock de FirestoreService
            userExists: jasmine.createSpy('userExists').and.returnValue(Promise.resolve(false)),
            getUserData: jasmine.createSpy('getUserData').and.returnValue(Promise.resolve(null)),
            addUser: jasmine.createSpy('addUser').and.returnValue(Promise.resolve()),
            updateUser: jasmine.createSpy('updateUser').and.returnValue(Promise.resolve())
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProfilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
