import { Injectable, Input } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})

export class UserService {

  @Input() currUser: any  

  constructor(private httpClient:HttpClient, private router:Router) {
    this.currUser = {}
  }

  signup(values){
    console.log(values);
    this.httpClient.post<any>("http://5000/api/user/signup", JSON.stringify(values), httpOptions).subscribe(
      (res) => {
        this.currUser = JSON.parse(res); 
        return 1;
      },
      (err) => {
        console.log(err); 
        return 0;
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
