import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent {
  @Input()
  posterImg: string = '';
  @Input()
  score: number = 0;
  @Input()
  title: string = '';
  @Input()
  originalTitle: string = '';
  @Input()
  releaseDate?: Date;
}
