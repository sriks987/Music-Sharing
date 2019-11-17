import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ISong } from '../song.model';
import { SongService } from '../song.service';


@Component({
  selector: 'app-music-thumbnail',
  templateUrl: './music-thumbnail.component.html',
  styleUrls: ['./music-thumbnail.component.css']
})
export class MusicThumbnailComponent implements OnInit {

  @Input() details:ISong;
  
  constructor(private songServ: SongService) { 
  }

  ngOnInit() {
  }

  openSong(){
    this.songServ.getSong(this.details.songId);
  }

}
