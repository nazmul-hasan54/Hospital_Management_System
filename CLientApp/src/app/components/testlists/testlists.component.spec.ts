import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestlistsComponent } from './testlists.component';

describe('TestlistsComponent', () => {
  let component: TestlistsComponent;
  let fixture: ComponentFixture<TestlistsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestlistsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestlistsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
