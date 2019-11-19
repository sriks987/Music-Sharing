import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  currUser: any

  constructor(private httpClient:HttpClient, private router:Router) {
    this.currUser = {}
  }

  signup(values){
    console.log(values);
    this.httpClient.post<any>("http://5000/api/user/signup", JSON.stringify(values)).subscribe(
      (res) => {
        this.currUser = JSON.parse(res); 
        this.router.navigate(['/home']);},
      (err) => {
        console.log(err); 
        this.router.navigate['/signup'];
      } 
    );
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
