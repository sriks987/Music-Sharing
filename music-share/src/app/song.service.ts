import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { ISong } from './song.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';

@Injectable({
  providedIn: 'root'
})
export class SongService {

  public currSongSource = new Subject<string>()
  public genreHistory = {}
  public searchNameSource = new Subject<string>()

  public currSong$ = this.currSongSource.asObservable()
  public searchName$ = this.searchNameSource.asObservable()

  constructor(private http: HttpClient) {

  }

  newSearchName(name){
    this.searchNameSource.next(name);
    //console.log(this.searchName);
  }

  getSong(song) {
    this.currSongSource.next(song);
    if (song.genre in this.genreHistory){
      this.genreHistory[song.genre] += 1
    }
    else{
      this.genreHistory[song.genre] = 1
    }
  }

  getSongList(name:string):Observable<ISong[]> {
    return this.http.get<any>('/api/songs/' + name)
      .pipe(catchError(this.handleError<ISong>('getSongList')))
  }

  uploadSong(song){
    //let options = {headers: new HttpHeaders({'Content-Type': 'application/json'})};
    const formData = new FormData();
    for (const key of Object.keys(song)) {
      const value = song[key];
      formData.append(key, value);
    }
    // var formData = "";
    // var urlEncodedDataPairs = [];
    // var name;

  // Turn the data object into an array of URL-encoded key/value pairs.
  // for(name in song) {
  //   urlEncodedDataPairs.push(encodeURIComponent(name) + '=' + encodeURIComponent(song[name]));
  // }

  // Combine the pairs into a single string and replace all %-encoded spaces to 
  // the '+' character; matches the behaviour of browser form submissions.
    // formData = urlEncodedDataPairs.join('&').replace(/%20/g, '+');

    console.log("Uploading values " + song)
    console.log("Form data is" + formData)
    // return this.http.post('http://0.0.0.0:5000/api/songs/upload', formData)
    //   .pipe(catchError(this.handleError<ISong>('uploadSong')))
    var xhr = new XMLHttpRequest();
    xhr.open("POST", 'http://0.0.0.0:5000/api/songs/upload', true);
    xhr.addEventListener('load', function(event) {
      alert('Yeah! Data sent and response loaded.');
    });
  
    // Define what happens in case of error
    xhr.addEventListener('error', function(event) {
      alert('Oops! Something goes wrong.');
    });
    // xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send(formData)
  }

  getRecommendedList(song){
    console.log("Genre history is: " + this.genreHistory)
    return 
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error:any): Observable<T> => {
      console.error(error);
      return of(result as T);
    }
  }
}
