import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartupModalComponent } from './startup-modal.component';

describe('StartupModalComponent', () => {
  let component: StartupModalComponent;
  let fixture: ComponentFixture<StartupModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StartupModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StartupModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
