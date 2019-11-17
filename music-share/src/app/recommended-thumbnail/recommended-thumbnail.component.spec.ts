import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecommendedThumbnailComponent } from './recommended-thumbnail.component';

describe('RecommendedThumbnailComponent', () => {
  let component: RecommendedThumbnailComponent;
  let fixture: ComponentFixture<RecommendedThumbnailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecommendedThumbnailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecommendedThumbnailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
