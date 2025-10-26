import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministracionClientes } from './administracion-clientes';

describe('AdministracionClientes', () => {
  let component: AdministracionClientes;
  let fixture: ComponentFixture<AdministracionClientes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdministracionClientes]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdministracionClientes);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
