import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCathedraComponent } from './create-cathedra.component';

describe('CreateCathedraComponent', () => {
  let component: CreateCathedraComponent;
  let fixture: ComponentFixture<CreateCathedraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateCathedraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCathedraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
