import { Component, OnInit } from '@angular/core';
import { MoviedbService } from 'src/app/services/moviedb.service';
import { MovieList } from 'src/app/model/movieList.model';
import { MovieDetails } from 'src/app/model/movieDetails.model';
import { MovieVideos } from 'src/app/model/movieVideos.model';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.scss'],
})
export class MoviesListComponent implements OnInit {
  typeList: string = 'popular';
  idioma: string = 'pt-BR';
  page: number = 1;
  id: number = 0;
  maxPage: number = 0;
  moviesData?: MovieList;
  movieDetailsData?: MovieDetails;
  movieVideosData?: MovieVideos;

  constructor(private moviedbService: MoviedbService) {}

  ngOnInit(): void {
    this.popularList();
  }

  loadMoviesList() {
    this.moviedbService
      .getMovies(this.typeList, this.idioma, this.page)
      .subscribe((response) => {
        this.moviesData = response;
        this.maxPage = response.total_pages;
      });
  }

  movieDetails(idSelected: number) {
    this.moviedbService
      .getMovieDetails(idSelected, this.idioma)
      .subscribe((response) => {
        this.movieDetailsData = response;
        this.movieVideos(idSelected);

        console.log(this.movieDetailsData);
      });
  }

  movieVideos(idSelected: number) {
    this.moviedbService.getMovieVideos(idSelected).subscribe((response) => {
      this.movieVideosData = response;
      console.log(this.movieVideosData.results);
    });
  }

  popularList() {
    this.typeList = 'popular';
    this.page = 1;
    this.loadMoviesList();
  }

  topRatedList() {
    this.typeList = 'top_rated';
    this.page = 1;
    this.loadMoviesList();
  }

  onTheatresList() {
    this.typeList = 'now_playing';
    this.page = 1;
    this.loadMoviesList();
  }

  nextPage() {
    if (this.maxPage >= this.page) {
      this.page += 1;
      this.loadMoviesList();
    }
  }

  previousPage() {
    if (this.page >= 1) {
      this.page -= 1;
      this.loadMoviesList();
    }
  }
}
