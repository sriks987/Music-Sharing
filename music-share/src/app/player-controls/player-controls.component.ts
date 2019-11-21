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
    this.msbapAudioUrl = null
    this.msbapTitle = 'hi'
    this.msbapDisplayTitle = true

    this.songService.currSong$.subscribe(
      newUrl => {
        console.log(`${newUrl} is the new song`);
        this.msbapAudioUrl = newUrl;
      }
    )
  }

  ngOnInit() {

  }



}
