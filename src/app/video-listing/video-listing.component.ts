import { Component, Input, OnInit } from '@angular/core';

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
