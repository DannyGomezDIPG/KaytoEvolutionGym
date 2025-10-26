import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlClientes } from './control-clientes';

describe('ControlClientes', () => {
  let component: ControlClientes;
  let fixture: ComponentFixture<ControlClientes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ControlClientes]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ControlClientes);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
