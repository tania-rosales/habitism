import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HabitListFatherComponent } from './habit-list-father.component';

describe('HabitListFatherComponent', () => {
  let component: HabitListFatherComponent;
  let fixture: ComponentFixture<HabitListFatherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HabitListFatherComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HabitListFatherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
