import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-video-container',
  templateUrl: './video-container.component.html',
  styleUrls: ['./video-container.component.css']
})
export class VideoContainerComponent implements OnInit {
  public videos;
  private tokens: Array<string> = [];
  private tokenIndex: number = -1;
  private endOfResults: boolean = false;

  constructor(private httpService: HttpService) {}

  ngOnInit() {
    this.processVideoData();
  }

  processVideoData() {
    const tokenQueryParam = this.tokenIndex >= 0 ? `&pageToken=${this.tokens[this.tokenIndex]}` : '';
    this.httpService.getVideoData(tokenQueryParam).subscribe(
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
