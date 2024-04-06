import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicinelistsEditComponent } from './medicinelists-edit.component';

describe('MedicinelistsEditComponent', () => {
  let component: MedicinelistsEditComponent;
  let fixture: ComponentFixture<MedicinelistsEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedicinelistsEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedicinelistsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
