import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppoinmentCreateComponent } from './appoinment-create.component';

describe('AppoinmentCreateComponent', () => {
  let component: AppoinmentCreateComponent;
  let fixture: ComponentFixture<AppoinmentCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppoinmentCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppoinmentCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
