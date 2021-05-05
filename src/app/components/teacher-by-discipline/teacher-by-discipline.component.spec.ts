import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherByDisciplineComponent } from './teacher-by-discipline.component';

describe('TeacherByDisciplineComponent', () => {
  let component: TeacherByDisciplineComponent;
  let fixture: ComponentFixture<TeacherByDisciplineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeacherByDisciplineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherByDisciplineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
