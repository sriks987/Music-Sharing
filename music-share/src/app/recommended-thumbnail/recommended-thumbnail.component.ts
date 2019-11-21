import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-recommended-thumbnail',
  templateUrl: './recommended-thumbnail.component.html',
  styleUrls: ['./recommended-thumbnail.component.css']
})
export class RecommendedThumbnailComponent implements OnInit {

  @Input() details: any
  imgURL: string

  constructor() { 
    this.imgURL = ""
  }

  ngOnInit() {
  }

  // For multistage downloading
  onLoad(){
    this.imgURL = this.details.imgURL
  }
}
