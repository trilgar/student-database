import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherByTypeComponent } from './teacher-by-type.component';

describe('TeacherByTypeComponent', () => {
  let component: TeacherByTypeComponent;
  let fixture: ComponentFixture<TeacherByTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeacherByTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherByTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
