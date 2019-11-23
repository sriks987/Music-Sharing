import { Component, OnInit, Input } from '@angular/core';
import { SongService } from '../song.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Accept':  'blob',
  })
};


interface Window {
  webkitURL?: any;
}

declare var window: Window;

if (window.webkitURL !== undefined) {
  console.log(window.webkitURL);
}


@Component({
  selector: 'app-recommended-thumbnail',
  templateUrl: './recommended-thumbnail.component.html',
  styleUrls: ['./recommended-thumbnail.component.css']
})
export class RecommendedThumbnailComponent implements OnInit {

  @Input() details: any
  @Input() ident: any
  imgURL: string
  element: HTMLImageElement
  parentElement: HTMLElement;

  constructor(private songService: SongService, private httpClient: HttpClient) { 
    this.imgURL = "http://127.0.0.1:5000"
  }

  ngOnInit() {
  }

  // ngOnChanges(changes: any){
  //   //this.fetchImage(this.imgURL + this.details.imgURL)
  //   this.parentElement = document.getElementById(this.details.songName)
  //   this.element =  document.createElement('img')
  //   this.element.src = this.imgURL + this.details.imgURL
  //   this.parentElement.appendChild(this.element)
  // }

  fetchImage(blobURL){
    // var xhr = new XMLHttpRequest()
    // xhr.open("GET", blobURL);
    // xhr.responseType = "blob";
    // xhr.onload = this.processResponse;
    // xhr.send();
    console.log(this.imgURL + this.details.imgURL)
    var temp = this.imgURL + this.details.imgURL
    this.httpClient.get<any>(temp, httpOptions)
    .subscribe(
      (res) => {
        console.log(res)
        // var imageUrl = URL.createObjectURL(res);
        // this.parentElement =  document.getElementById(this.details.songName);
        // this.element =  document.createElement('img')
        // this.element.src = imageUrl
        // this.parentElement.appendChild(this.element)        
      },
      (err) => {
        console.log(err)
      }
    )    
  }

  processResponse(e){
    // if(this.tatus!=200){
    //   console.log()
    // }
    console.log(e)
    var urlCreator =  window.webkitURL;
    var imageUrl = URL.createObjectURL(e);
    this.parentElement =  document.getElementById("d1");
    this.element =  document.createElement('img')
    this.element.src = imageUrl
    this.parentElement.appendChild(this.element)
    
  }

  openSong(song){
    this.songService.getSong(song.songUrl);
  }
}
