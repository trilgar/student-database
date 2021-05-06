import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScienceWorkComponent } from './science-work.component';

describe('ScienceWorkComponent', () => {
  let component: ScienceWorkComponent;
  let fixture: ComponentFixture<ScienceWorkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScienceWorkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScienceWorkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
