import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HospitalsEditComponent } from './hospitals-edit.component';

describe('HospitalsEditComponent', () => {
  let component: HospitalsEditComponent;
  let fixture: ComponentFixture<HospitalsEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HospitalsEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HospitalsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
