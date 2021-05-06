import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateScienceWorkComponent } from './create-science-work.component';

describe('CreateScienceWorkComponent', () => {
  let component: CreateScienceWorkComponent;
  let fixture: ComponentFixture<CreateScienceWorkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateScienceWorkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateScienceWorkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
