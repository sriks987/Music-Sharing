import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../user.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {

  SERVER_URL = "http://0.0.0.0:5000/api/user/upload";
  giveForm: FormGroup;

  constructor(private httpClient: HttpClient, private formBuilder: FormBuilder, private userService: UserService) { 

  }

  ngOnInit() {
    this.giveForm = this.formBuilder.group({
      imgFile: ['']
    })
  }

  onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.giveForm.get('imgFile').setValue(file);
    }
  }

  onSubmit(value) {
    console.log(value)
    const formData = new FormData();
    formData.append('userName', value.userName);
    formData.append('password', value.password);
    formData.append('imgFile', this.giveForm.get('imgFile').value);

    this.httpClient.post<any>(this.SERVER_URL, formData).subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    );
  }
}
