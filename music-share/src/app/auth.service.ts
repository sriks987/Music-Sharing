import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  })
};


@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(private httpClient: HttpClient) { 

  }

  valLogin(values):any{
    console.log("Inside valLogin")
    return this.httpClient.post<any>("http://127.0.0.1:5000/api/user/valLogin", JSON.stringify(values), httpOptions)
    // .subscribe(
    //   (res) => {
    //     console.log("reached here")
    //     console.log("Auth Service: res - "+ res.val)
    //     var perms = res;
    //     if(perms.val == 1){
    //       console.log("Entered here")
    //       return perms;
    //     }
    //     else {
    //       return {'val': 0};
    //     }
    //   },
    //   (err) => {
    //     console.log(err);
    //     return 0;
    //   }
    // )
    // return 1
  }

  logout(){
    
  }
}
