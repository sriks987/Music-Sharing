import { Component, OnInit } from '@angular/core';
import { SongService } from '../song.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

  name: string

  constructor(private songService: SongService) { 
    
  }

  ngOnInit() {
  }

  setSearchName(){
    //console.log("in bar: " + this.name)
    this.songService.newSearchName(this.name)
  }

}
