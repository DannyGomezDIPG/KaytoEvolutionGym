import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialSocio } from './historial-socio';

describe('HistorialSocio', () => {
  let component: HistorialSocio;
  let fixture: ComponentFixture<HistorialSocio>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistorialSocio]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistorialSocio);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
