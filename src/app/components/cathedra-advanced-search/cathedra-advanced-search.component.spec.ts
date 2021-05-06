import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CathedraAdvancedSearchComponent } from './cathedra-advanced-search.component';

describe('CathedraAdvancedSearchComponent', () => {
  let component: CathedraAdvancedSearchComponent;
  let fixture: ComponentFixture<CathedraAdvancedSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CathedraAdvancedSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CathedraAdvancedSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
