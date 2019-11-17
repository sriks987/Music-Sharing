import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecommendListComponent } from './recommend-list.component';

describe('RecommendListComponent', () => {
  let component: RecommendListComponent;
  let fixture: ComponentFixture<RecommendListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecommendListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecommendListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
