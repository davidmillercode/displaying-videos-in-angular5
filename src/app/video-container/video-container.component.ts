import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; // move to service
import { Observable } from 'rxjs/Observable'; // move to service

@Component({
  selector: 'app-video-container',
  templateUrl: './video-container.component.html',
  styleUrls: ['./video-container.component.css']
})
export class VideoContainerComponent implements OnInit {
  public videos;
  private tokens: Array = [];
  private tokenIndex: Number = -1;
  private apiUrl: string = 'https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=UCbn1OgGei-DV7aSRo_HaAiw&key=AIzaSyA8OHCyYSR7aFsJXsna7TumltQ0v56rUWU&maxResults=10';

  constructor(private http:HttpClient) {
  }

  ngOnInit() {
    this.processVideoData();
  }

  // TODO: Move to service
  getVideoData() {
    const tokenQueryParam = this.tokenIndex >= 0 ? `&pageToken=${this.tokens[this.tokenIndex]}` : '';
    const urlToGet = this.tokenIndex >= 0 ? `${this.apiUrl}${tokenQueryParam}` : this.apiUrl;
    return this.http.get(urlToGet);
  }

  // TODO change to getVideoData and move getVideoData (current) to a service
  processVideoData() {
    // TODO: Change to import service and name method getVideoData
    this.getVideoData().subscribe(
        data => {
          // Do not reload the page if there is no new data
          console.log('token: ', data.nextPageToken);
          console.log('last token: ', this.tokens[this.tokens.length - 1]);
          if (data.nextPageToken === undefined) {
            console.log('failed!');
            return;
          } else {
            // Update this.videos with newly formatted data
            this.videos = data.items.map(item => item.snippet);
            // Check to make sure we don't add any tokens when we are not on the furthest page the user has accessed
            if (this.tokenIndex + 1 > this.tokens.length && !this.tokens.length || this.tokens[this.tokenIndex] !== data.nextPageToken) {
              console.log('failed2!');
              this.tokens.push(data.nextPageToken);
            } else {
              this.tokenIndex -= 1;
            }
          }
        },
        err => console.error(err),
      () => console.log('done loading api')
    );
  }

  nextPage() {
    this.tokenIndex += 1;
    this.processVideoData();
  }

  previousPage() {
    this.tokenIndex -= 1;
    this.processVideoData();
  }
}
