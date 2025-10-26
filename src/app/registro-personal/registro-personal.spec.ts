import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroPersonal } from './registro-personal';

describe('RegistroPersonal', () => {
  let component: RegistroPersonal;
  let fixture: ComponentFixture<RegistroPersonal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistroPersonal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistroPersonal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
