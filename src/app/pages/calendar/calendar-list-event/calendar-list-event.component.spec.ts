import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarListEventComponent } from './calendar-list-event.component';

describe('CalendarListEventComponent', () => {
  let component: CalendarListEventComponent;
  let fixture: ComponentFixture<CalendarListEventComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CalendarListEventComponent]
    });
    fixture = TestBed.createComponent(CalendarListEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
