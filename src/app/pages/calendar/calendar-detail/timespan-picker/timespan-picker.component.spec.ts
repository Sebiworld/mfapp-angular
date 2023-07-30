import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimespanPickerComponent } from './timespan-picker.component';

describe('TimespanPickerComponent', () => {
  let component: TimespanPickerComponent;
  let fixture: ComponentFixture<TimespanPickerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TimespanPickerComponent]
    });
    fixture = TestBed.createComponent(TimespanPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
