import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentFilterByMarkComponent } from './student-filter-by-mark.component';

describe('StudentFilterByMarkComponent', () => {
  let component: StudentFilterByMarkComponent;
  let fixture: ComponentFixture<StudentFilterByMarkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentFilterByMarkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentFilterByMarkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
