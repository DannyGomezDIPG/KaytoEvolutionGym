import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Huellas } from './huellas';

describe('Huellas', () => {
  let component: Huellas;
  let fixture: ComponentFixture<Huellas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Huellas]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Huellas);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
