import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BedsCreateComponent } from './beds-create.component';

describe('BedsCreateComponent', () => {
  let component: BedsCreateComponent;
  let fixture: ComponentFixture<BedsCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BedsCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BedsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
