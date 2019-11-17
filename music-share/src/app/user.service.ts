import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  currUser: any

  constructor(private http:HttpClient) {
    this.currUser = {}
  }

  getData(userID){
    console.log("The user id is "+ userID)
    return
  }

  changeData(newValues){
    console.log("Data changed to " + newValues)
    return
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error:any): Observable<T> => {
      console.error(error)
      return of(result as T)
    }
  }

}
