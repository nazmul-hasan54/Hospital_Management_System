import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InptprescriptionsEditComponent } from './inptprescriptions-edit.component';

describe('InptprescriptionsEditComponent', () => {
  let component: InptprescriptionsEditComponent;
  let fixture: ComponentFixture<InptprescriptionsEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InptprescriptionsEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InptprescriptionsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
