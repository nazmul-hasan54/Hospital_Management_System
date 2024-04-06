import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedulesEditComponent } from './schedules-edit.component';

describe('SchedulesEditComponent', () => {
  let component: SchedulesEditComponent;
  let fixture: ComponentFixture<SchedulesEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchedulesEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SchedulesEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
