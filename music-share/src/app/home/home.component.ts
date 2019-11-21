import { Component, OnInit } from '@angular/core';
import { SongService } from '../song.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  songList: any;

  constructor(private songService: SongService, private userService: UserService) { 

  }

  ngOnInit() {
    this.getRecommendation()
  }

  getRecommendation(){
    //this.songList = this.songService.getRecommendedList();
    this.songList = [{songName: "hello"}]
  }
}
