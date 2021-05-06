import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScienceWorkAdvancedSearchComponent } from './science-work-advanced-search.component';

describe('ScienceWorkAdvancedSearchComponent', () => {
  let component: ScienceWorkAdvancedSearchComponent;
  let fixture: ComponentFixture<ScienceWorkAdvancedSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScienceWorkAdvancedSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScienceWorkAdvancedSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
