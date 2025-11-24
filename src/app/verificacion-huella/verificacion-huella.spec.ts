import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerificacionHuella } from './verificacion-huella';

describe('VerificacionHuella', () => {
  let component: VerificacionHuella;
  let fixture: ComponentFixture<VerificacionHuella>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerificacionHuella]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerificacionHuella);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
