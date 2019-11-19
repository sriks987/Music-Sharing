import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { SongService } from '../song.service';
import { ISong } from '../song.model';

@Component({
  selector: 'app-music-list',
  templateUrl: './music-list.component.html',
  styleUrls: ['./music-list.component.css']
})
export class MusicListComponent implements OnInit {

  songList: ISong[]

  constructor(private songService: SongService) { 
    this.songService.searchName$.subscribe(
      newName => {
        console.log(`${newName} is the new name`);
        this.songService.getSongList(newName).subscribe(resp => this.songList = resp);
      }
    )
  }

  ngOnInit() {
  }

  openSong(song){
    this.songService.getSong(song.songUrl);
  }


}
