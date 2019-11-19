import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private userService: UserService) { 

  }

  ngOnInit() {
  }

  signup(value){
    console.log("Signup values: "+value);
    this.userService.signup(value)
  }
}
