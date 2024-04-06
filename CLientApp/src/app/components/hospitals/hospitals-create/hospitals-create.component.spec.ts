import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HospitalsCreateComponent } from './hospitals-create.component';

describe('HospitalsCreateComponent', () => {
  let component: HospitalsCreateComponent;
  let fixture: ComponentFixture<HospitalsCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HospitalsCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HospitalsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
