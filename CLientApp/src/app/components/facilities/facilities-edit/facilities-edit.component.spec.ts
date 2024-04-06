import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacilitiesEditComponent } from './facilities-edit.component';

describe('FacilitiesEditComponent', () => {
  let component: FacilitiesEditComponent;
  let fixture: ComponentFixture<FacilitiesEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FacilitiesEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FacilitiesEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
