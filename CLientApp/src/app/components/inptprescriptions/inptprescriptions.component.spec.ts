import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InptprescriptionsComponent } from './inptprescriptions.component';

describe('InptprescriptionsComponent', () => {
  let component: InptprescriptionsComponent;
  let fixture: ComponentFixture<InptprescriptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InptprescriptionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InptprescriptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
