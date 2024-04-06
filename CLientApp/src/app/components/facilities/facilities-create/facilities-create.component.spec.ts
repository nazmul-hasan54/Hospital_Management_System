import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacilitiesCreateComponent } from './facilities-create.component';

describe('FacilitiesCreateComponent', () => {
  let component: FacilitiesCreateComponent;
  let fixture: ComponentFixture<FacilitiesCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FacilitiesCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FacilitiesCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
