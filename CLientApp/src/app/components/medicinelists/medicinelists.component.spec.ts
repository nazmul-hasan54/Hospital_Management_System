import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicinelistsComponent } from './medicinelists.component';

describe('MedicinelistsComponent', () => {
  let component: MedicinelistsComponent;
  let fixture: ComponentFixture<MedicinelistsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedicinelistsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedicinelistsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
