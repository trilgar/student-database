import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SemesterRangeComponent } from './semester-range.component';

describe('SemeterRangeComponent', () => {
  let component: SemesterRangeComponent;
  let fixture: ComponentFixture<SemesterRangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SemesterRangeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SemesterRangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
