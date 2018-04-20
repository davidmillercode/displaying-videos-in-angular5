import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-video-container',
  templateUrl: './video-container.component.html',
  styleUrls: ['./video-container.component.css']
})
export class VideoContainerComponent implements OnInit {
  public videos;
  private tokens: Array<string> = [];
  private tokenIndex: number = -1;
  private apiUrl: string = 'https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=UCbn1OgGei-DV7aSRo_HaAiw&key=AIzaSyA8OHCyYSR7aFsJXsna7TumltQ0v56rUWU&maxResults=10';
  private endOfResults: boolean = false;

  constructor(private http:HttpClient) {
  }

  ngOnInit() {
    this.processVideoData();
  }

  getVideoData() {
    const tokenQueryParam = this.tokenIndex >= 0 ? `&pageToken=${this.tokens[this.tokenIndex]}` : '';
    const urlToGet = this.tokenIndex >= 0 ? `${this.apiUrl}${tokenQueryParam}` : this.apiUrl;
    return this.http.get(urlToGet);
  }

  processVideoData() {
    this.getVideoData().subscribe(
        data => {
          const noNextToken = data.nextPageToken === undefined;
          // Update this.videos with newly formatted data
          this.videos = data.items.map(item => item.snippet);
          // Check to make sure we don't add any tokens when we are not on the furthest page the user has accessed
          const tokenNotFound = !this.tokens.length || this.tokens.indexOf(data.nextPageToken) === -1;
          if (tokenNotFound  && !noNextToken) {
            this.addToken(data.nextPageToken);
          } else if (noNextToken) {
            this.endOfResultsHandler();
          }
        },
        err => console.error(err),
      () => console.log('done loading api')
    );
  }

  endOfResultsHandler() {
    this.endOfResults = true;
    this.tokenIndex -= 1;
  }

  addToken(token) {
    this.tokens.push(token);
    this.endOfResults = false;
  }

  nextPage() {
    this.tokenIndex += 1;
    this.processVideoData();
  }

  previousPage() {
    this.tokenIndex -= 1;
    this.endOfResults = false;
    this.processVideoData();
  }
}
