import { Component, OnInit } from '@angular/core';
import { SongService } from '../song.service';

@Component({
  selector: 'app-player-controls',
  templateUrl: './player-controls.component.html',
  styleUrls: ['./player-controls.component.css']
})
export class PlayerControlsComponent implements OnInit {

  msbapTitle: any
  msbapAudioUrl: any

  msbapDisplayTitle: any
  msbapDisplayVolumeControls = true

  constructor(private songService: SongService) { 
    this.msbapAudioUrl = 'http://127.0.0.1:5000/uploads/01._tokyo.mp3'
    this.msbapTitle = 'hi'
    this.msbapDisplayTitle = true

    this.songService.currSong$.subscribe(
      newUrl => {
        console.log(`${newUrl} is the new song`);
        //this.songService.getSongList(newName).subscribe(resp => this.songList = resp);
        this.msbapAudioUrl = newUrl;
      }
    )
  }

  ngOnInit() {

  }



}
