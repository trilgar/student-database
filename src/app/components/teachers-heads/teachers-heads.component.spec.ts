import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeachersHeadsComponent } from './teachers-heads.component';

describe('TeachersHeadsComponent', () => {
  let component: TeachersHeadsComponent;
  let fixture: ComponentFixture<TeachersHeadsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeachersHeadsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeachersHeadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
