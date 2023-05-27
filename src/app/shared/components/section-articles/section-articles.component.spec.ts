import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionArticlesComponent } from './section-articles.component';

describe('SectionArticlesComponent', () => {
  let component: SectionArticlesComponent;
  let fixture: ComponentFixture<SectionArticlesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SectionArticlesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SectionArticlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
