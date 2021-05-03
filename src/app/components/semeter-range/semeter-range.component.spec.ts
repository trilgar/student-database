import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SemeterRangeComponent } from './semeter-range.component';

describe('SemeterRangeComponent', () => {
  let component: SemeterRangeComponent;
  let fixture: ComponentFixture<SemeterRangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SemeterRangeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SemeterRangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
