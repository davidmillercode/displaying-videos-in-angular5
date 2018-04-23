import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class HttpService {
  private apiUrl: string = 'https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=UCbn1OgGei-DV7aSRo_HaAiw&key=AIzaSyA8OHCyYSR7aFsJXsna7TumltQ0v56rUWU&maxResults=10';
  constructor(private http: HttpClient) {
  }

  getVideoData(tokenQueryParam) {
    const urlToGet = `${this.apiUrl}${tokenQueryParam}`;
    return this.http.get(urlToGet);
  }

}
