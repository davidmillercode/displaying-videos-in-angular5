import { Component, Input, OnInit } from '@angular/core';
import { VideoListing } from '../shared/models/video-listing.model';

@Component({
  selector: 'app-video-listing',
  templateUrl: './video-listing.component.html',
  styleUrls: ['./video-listing.component.css']
})
export class VideoListingComponent implements OnInit {
  @Input() snippet;

  constructor() { }

  ngOnInit() {

  }
}
