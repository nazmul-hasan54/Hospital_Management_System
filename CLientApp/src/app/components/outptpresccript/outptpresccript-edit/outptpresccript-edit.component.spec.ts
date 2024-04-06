import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutptpresccriptEditComponent } from './outptpresccript-edit.component';

describe('OutptpresccriptEditComponent', () => {
  let component: OutptpresccriptEditComponent;
  let fixture: ComponentFixture<OutptpresccriptEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OutptpresccriptEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OutptpresccriptEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
