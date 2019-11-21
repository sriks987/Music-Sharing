import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service'; 
import { Router } from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginStatus: number

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit() {
  }

  login(value){
    console.log(value)
    this.loginStatus = this.authService.valLogin(value)
    console.log("loginStatus: "+ this.loginStatus)
    if(this.loginStatus == 1){
      console.log("Comes here")
      this.router.navigate(['home'])
    }
    else if(this.loginStatus == 0){
      console.log("Wrong password")
      alert("You have entered the wrong password")
    }
    console.log("Comes outside")
    
  }
}
