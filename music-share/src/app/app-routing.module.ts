import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RecommendListComponent } from './recommend-list/recommend-list.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { MusicListComponent } from './music-list/music-list.component';
import { UploadSongComponent } from './upload-song/upload-song.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'home', component: HomeComponent},
  { path: 'search', component: MusicListComponent},
  { path: 'upload', component: UploadSongComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
