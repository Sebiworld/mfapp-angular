import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NicknameModalComponent } from './nickname-modal.component';

describe('NicknameModalComponent', () => {
  let component: NicknameModalComponent;
  let fixture: ComponentFixture<NicknameModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NicknameModalComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(NicknameModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
