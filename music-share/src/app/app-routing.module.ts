import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MusicListComponent } from './music-list/music-list.component';
import { UploadSongComponent } from './upload-song/upload-song.component';
import { HomeComponent } from './home/home.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'signup', component: SignupComponent},
  { path: 'home', component: HomeComponent},
  { path: 'search', component: MusicListComponent},
  { path: 'upload', component: UploadSongComponent},
  { path: 'profile', component: ProfilePageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
