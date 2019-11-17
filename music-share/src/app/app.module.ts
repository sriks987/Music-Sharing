import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxAudioPlayerModule } from 'ngx-audio-player';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MusicListComponent } from './music-list/music-list.component';
import { MusicThumbnailComponent } from './music-thumbnail/music-thumbnail.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { RecommendListComponent } from './recommend-list/recommend-list.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { PlayerControlsComponent } from './player-controls/player-controls.component';
import { RecommendedThumbnailComponent } from './recommended-thumbnail/recommended-thumbnail.component';

import { SongService } from './song.service';
import { UserService } from './user.service';
import { AuthService } from './auth.service';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { UploadSongComponent } from './upload-song/upload-song.component';

@NgModule({
  declarations: [
    AppComponent,
    MusicListComponent,
    MusicThumbnailComponent,
    UserProfileComponent,
    RecommendListComponent,
    SearchBarComponent,
    NavBarComponent,
    PlayerControlsComponent,
    RecommendedThumbnailComponent,
    LoginComponent,
    SignupComponent,
    UploadSongComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgxAudioPlayerModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [SongService, UserService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
