import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { SongService } from '../song.service';

@Component({
  selector: 'app-music-list',
  templateUrl: './music-list.component.html',
  styleUrls: ['./music-list.component.css']
})
export class MusicListComponent implements OnInit {

  @Output() songIdent = new EventEmitter()

  constructor(private songServ: SongService) { 
    this.songServ.searchName$.subscribe(
      newName => {
        console.log(`${newName} is the new name`);
      }
    )
  }

  ngOnInit() {
  }

  

}
