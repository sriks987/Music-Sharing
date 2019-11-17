import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http'
import { SongService } from '../song.service';


@Component({
  selector: 'app-upload-song',
  templateUrl: './upload-song.component.html',
  styleUrls: ['./upload-song.component.css']
})
export class UploadSongComponent implements OnInit {

  SERVER_URL = "http://0.0.0.0:5000/api/songs/upload";
  giveForm: FormGroup;
  //@Input() formGroup: any;

  constructor(private songServ: SongService, private formBuilder: FormBuilder, private httpClient:HttpClient) { 

  }

  ngOnInit() {
    this.giveForm = this.formBuilder.group({
      songFile: [''],
      imgFile: ['']
    })
  }

  onFirstFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.giveForm.get('songFile').setValue(file);
    }
  }

  onSecFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.giveForm.get('imgFile').setValue(file);
    }
  }

  upload(value){
    console.log(value)
    this.songServ.uploadSong(value)
  }

  onSubmit(value) {
    console.log(value)
    const formData = new FormData();
    formData.append('songName', value.songName);
    formData.append('genre', value.genre);
    formData.append('songFile', this.giveForm.get('songFile').value);
    formData.append('imgFile', this.giveForm.get('imgFile').value);

    this.httpClient.post<any>(this.SERVER_URL, formData).subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    );
  }
}
