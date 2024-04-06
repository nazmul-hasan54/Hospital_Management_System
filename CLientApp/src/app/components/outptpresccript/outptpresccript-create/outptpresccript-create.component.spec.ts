import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutptpresccriptCreateComponent } from './outptpresccript-create.component';

describe('OutptpresccriptCreateComponent', () => {
  let component: OutptpresccriptCreateComponent;
  let fixture: ComponentFixture<OutptpresccriptCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OutptpresccriptCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OutptpresccriptCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
