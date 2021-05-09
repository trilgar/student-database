import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateGraduateWorkComponent } from './create-graduate-work.component';

describe('CreateGraduateWorkComponent', () => {
  let component: CreateGraduateWorkComponent;
  let fixture: ComponentFixture<CreateGraduateWorkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateGraduateWorkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateGraduateWorkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
