import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

import { VideoListingComponent } from './video-listing/video-listing.component';
import { VideoContainerComponent } from './video-container/video-container.component';
import { VideoThumbnailComponent } from './video-thumbnail/video-thumbnail.component';

import { HttpService } from './services/http.service';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material';
import { MatDividerModule } from '@angular/material/divider';


@NgModule({
  declarations: [
    AppComponent,
    VideoContainerComponent,
    VideoListingComponent,
    VideoThumbnailComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatDividerModule,
  ],
  providers: [HttpService],
  bootstrap: [AppComponent],
  schemas: [ NO_ERRORS_SCHEMA ],
})
export class AppModule { }
