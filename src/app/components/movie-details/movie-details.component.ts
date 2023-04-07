import { Component, Input, OnInit } from '@angular/core';
import { MovieDetails } from 'src/app/model/movieDetails.model';
import { MovieVideos } from 'src/app/model/movieVideos.model';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss'],
})
export class MovieDetailsComponent implements OnInit {
  @Input()
  movieDetails?: MovieDetails;
  @Input()
  movieVideos?: MovieVideos;
  videoUrl: string = 'dcpcwARBMJ4';

  constructor() {}
  ngOnInit(): void {}

  clgMovie() {
    console.log(this.movieVideos);
  }
}
