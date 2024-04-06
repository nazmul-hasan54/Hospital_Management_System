import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicinelistsCreateComponent } from './medicinelists-create.component';

describe('MedicinelistsCreateComponent', () => {
  let component: MedicinelistsCreateComponent;
  let fixture: ComponentFixture<MedicinelistsCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedicinelistsCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedicinelistsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
