import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisciplineLoadComponent } from './discipline-load.component';

describe('DisciplineLoadComponent', () => {
  let component: DisciplineLoadComponent;
  let fixture: ComponentFixture<DisciplineLoadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisciplineLoadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisciplineLoadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
