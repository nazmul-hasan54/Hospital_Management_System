import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestlistCreateComponent } from './testlist-create.component';

describe('TestlistCreateComponent', () => {
  let component: TestlistCreateComponent;
  let fixture: ComponentFixture<TestlistCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestlistCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestlistCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
