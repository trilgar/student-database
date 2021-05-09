import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GwAdvancedSearchComponent } from './gw-advanced-search.component';

describe('GwAdvancedSearchComponent', () => {
  let component: GwAdvancedSearchComponent;
  let fixture: ComponentFixture<GwAdvancedSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GwAdvancedSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GwAdvancedSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
