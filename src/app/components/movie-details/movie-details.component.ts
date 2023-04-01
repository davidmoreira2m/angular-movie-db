import { Component, Input } from '@angular/core';
import { MovieDetails } from 'src/app/model/movieDetails.model';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss'],
})
export class MovieDetailsComponent {
  @Input()
  movieDetails?: MovieDetails;
}
