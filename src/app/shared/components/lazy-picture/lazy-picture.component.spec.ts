import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LazyPictureComponent } from './lazy-picture.component';

describe('LazyPictureComponent', () => {
  let component: LazyPictureComponent;
  let fixture: ComponentFixture<LazyPictureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LazyPictureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LazyPictureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
