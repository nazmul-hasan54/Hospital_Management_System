import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestlistEditComponent } from './testlist-edit.component';

describe('TestlistEditComponent', () => {
  let component: TestlistEditComponent;
  let fixture: ComponentFixture<TestlistEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestlistEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestlistEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
