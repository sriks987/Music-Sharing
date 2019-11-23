import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { ISong } from './song.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  })
};

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
    console.log(name);
  }

  getSong(song) {
    this.currSongSource.next(song);
    console.log("getSong: song - ", song)
    console.log("getSong: currSongSource - ", this.currSongSource)
    if (song){
      if (song.genre in this.genreHistory){
        this.genreHistory[song.genre] += 1
        console.log("getSong: genreHistory - ", this.genreHistory)
      }
      else{
        this.genreHistory[song.genre] = 1
        console.log("getSong: genreHistory - ", this.genreHistory)
      }
    }
  }

  getSongList(name:string):Observable<ISong[]> {
    return this.http.get<any>('http://0.0.0.0:5000/api/songs/getlist/' + name, httpOptions)
      .pipe(catchError(this.handleError<ISong[]>('getSongList', [])))
  }

  
  getRecommendedList(userid){
    console.log("Genre history is: " + JSON.stringify(this.genreHistory))
    return this.http.post<any>('http://127.0.0.1:5000/api/songs/recommend', JSON.stringify({userID: userid, history: this.genreHistory}), httpOptions)
     
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error:any): Observable<T> => {
      console.error(error);
      return of(result as T);
    }
  }
}
