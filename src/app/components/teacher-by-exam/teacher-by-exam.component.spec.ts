import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherByExamComponent } from './teacher-by-exam.component';

describe('TeacherByExamComponent', () => {
  let component: TeacherByExamComponent;
  let fixture: ComponentFixture<TeacherByExamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeacherByExamComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherByExamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
