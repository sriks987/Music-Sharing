import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit() {

  }

}
