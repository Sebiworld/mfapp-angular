import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterConfirmModalComponent } from './register-confirm-modal.component';

describe('RegisterConfirmModalComponent', () => {
  let component: RegisterConfirmModalComponent;
  let fixture: ComponentFixture<RegisterConfirmModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisterConfirmModalComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(RegisterConfirmModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
