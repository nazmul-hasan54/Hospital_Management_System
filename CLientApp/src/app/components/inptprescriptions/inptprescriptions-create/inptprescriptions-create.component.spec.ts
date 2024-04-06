import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InptprescriptionsCreateComponent } from './inptprescriptions-create.component';

describe('InptprescriptionsCreateComponent', () => {
  let component: InptprescriptionsCreateComponent;
  let fixture: ComponentFixture<InptprescriptionsCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InptprescriptionsCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InptprescriptionsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
