import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlPagos } from './control-pagos';

describe('ControlPagos', () => {
  let component: ControlPagos;
  let fixture: ComponentFixture<ControlPagos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ControlPagos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ControlPagos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
