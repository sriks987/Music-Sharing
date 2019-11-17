import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadSongComponent } from './upload-song.component';

describe('UploadSongComponent', () => {
  let component: UploadSongComponent;
  let fixture: ComponentFixture<UploadSongComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadSongComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadSongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
