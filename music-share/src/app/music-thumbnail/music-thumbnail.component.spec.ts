import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MusicThumbnailComponent } from './music-thumbnail.component';

describe('MusicThumbnailComponent', () => {
  let component: MusicThumbnailComponent;
  let fixture: ComponentFixture<MusicThumbnailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MusicThumbnailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MusicThumbnailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
