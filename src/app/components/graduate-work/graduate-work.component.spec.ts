import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraduateWorkComponent } from './graduate-work.component';

describe('GraduateWorkComponent', () => {
  let component: GraduateWorkComponent;
  let fixture: ComponentFixture<GraduateWorkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraduateWorkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GraduateWorkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
