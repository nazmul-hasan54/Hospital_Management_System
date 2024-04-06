import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppoinmentEditComponent } from './appoinment-edit.component';

describe('AppoinmentEditComponent', () => {
  let component: AppoinmentEditComponent;
  let fixture: ComponentFixture<AppoinmentEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppoinmentEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppoinmentEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
