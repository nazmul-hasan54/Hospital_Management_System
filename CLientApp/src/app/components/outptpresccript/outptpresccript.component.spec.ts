import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutptpresccriptComponent } from './outptpresccript.component';

describe('OutptpresccriptComponent', () => {
  let component: OutptpresccriptComponent;
  let fixture: ComponentFixture<OutptpresccriptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OutptpresccriptComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OutptpresccriptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
