import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  perms: any

  constructor(private httpClient: HttpClient) { 

  }

  valLogin(values):number{
    console.log("Inside valLogin")
    this.httpClient.post<any>("http://127.0.0.1:5000/api/user/valLogin", JSON.stringify(values)).subscribe(
      (res) => {
        console.log("reached here")
        console.log("Auth Service: res - "+ res)
        this.perms = JSON.parse(res);
        if(this.perms.val == 1){
          return 1;
        }
        else {
          return 0;
        }
      },
      (err) => {
        console.log(err);
        return 0;
      }
    )
    return 1
  }

  logout(){
    
  }
}
