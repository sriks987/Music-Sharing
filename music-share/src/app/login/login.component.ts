import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { UserService } from '../user.service'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginStatus: any

  constructor(private authService: AuthService, private userService: UserService, private router: Router) {
  }

  ngOnInit() {
  }

  // login(value){
  //   console.log(value)
  //   this.loginStatus = this.authService.valLogin(value)
  //   console.log("loginStatus: "+ this.loginStatus)
  //   if(this.loginStatus.val == 1){
  //     console.log("Comes here")
  //     this.userService.currUser = this.loginStatus.userDetails
  //     this.router.navigate(['home'])
  //   }
  //   else if(this.loginStatus.val == 0){
  //     console.log("Wrong password")
  //     alert("You have entered the wrong password")
  //   }
  //   console.log("Comes outside")
    
  // }

  login(value){
    console.log(value)
    this.loginStatus = this.authService.valLogin(value)
    console.log("loginStatus: "+ this.loginStatus)
    this.loginStatus.subscribe(
      (res) => {
        
        var perms = res;
        if(perms.val == 1){
          console.log("Comes here")
          console.log("userDetails: ", perms.userDetails)
          this.userService.currUser = perms.userDetails
          this.router.navigate(['home']) 
        }
        else {
          console.log("Wrong password")
         alert("You have entered the wrong password")
        }
      },
      (err) => {
        console.log(err);
        return 0;
      }
    )
  }
}
