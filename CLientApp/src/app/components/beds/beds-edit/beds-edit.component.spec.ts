import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BedsEditComponent } from './beds-edit.component';

describe('BedsEditComponent', () => {
  let component: BedsEditComponent;
  let fixture: ComponentFixture<BedsEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BedsEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BedsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
