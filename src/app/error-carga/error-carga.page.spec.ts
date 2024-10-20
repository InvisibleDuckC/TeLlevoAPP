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
});
