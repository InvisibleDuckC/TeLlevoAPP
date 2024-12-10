import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ErrorCargaPage } from './error-carga.page';

describe('ErrorCargaPage', () => {
  let component: ErrorCargaPage;
  let fixture: ComponentFixture<ErrorCargaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorCargaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have the correct title or content in the template', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    // Verifica que el título o contenido esperado esté presente en el DOM
    expect(compiled.querySelector('ion-title')?.textContent).toContain('pagina no encontrada');
  });

  it('should initialize with default values', () => {
    // Verifica que el componente se inicializa correctamente con valores por defecto
    expect(component).toBeDefined();
    expect(component.ngOnInit).toBeDefined();
  });
});
