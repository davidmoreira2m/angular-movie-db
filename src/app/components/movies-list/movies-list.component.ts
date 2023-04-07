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
  listCont = {
    typeList: 'popular',
    idioma: 'pt-BR',
    page: 1,
    id: 0,
    maxPage: 0,
  };

  moviesData?: MovieList;
  movieDetailsData?: MovieDetails;
  movieVideosData?: MovieVideos;

  constructor(private moviedbService: MoviedbService) {}

  ngOnInit(): void {
    this.popularList();
  }

  loadMoviesList() {
    this.moviedbService
      .getMovies(
        this.listCont.typeList,
        this.listCont.idioma,
        this.listCont.page
      )
      .subscribe((response) => {
        this.moviesData = response;
        this.listCont.maxPage = response.total_pages;
        this.movieDetailsData = undefined;
      });
  }

  movieDetails(idSelected: number) {
    this.moviedbService
      .getMovieDetails(idSelected, this.listCont.idioma)
      .subscribe((response) => {
        this.movieDetailsData = response;
        this.movieVideos(idSelected);
      });
    this.moviesData = undefined;
  }

  movieVideos(idSelected: number) {
    this.moviedbService.getMovieVideos(idSelected).subscribe((response) => {
      this.movieVideosData = response;
      console.log(this.movieVideosData.results);
    });
  }

  popularList() {
    this.listCont.typeList = 'popular';
    this.listCont.page = 1;
    this.loadMoviesList();
  }

  topRatedList() {
    this.listCont.typeList = 'top_rated';
    this.listCont.page = 1;
    this.loadMoviesList();
  }

  onTheatresList() {
    this.listCont.typeList = 'now_playing';
    this.listCont.page = 1;
    this.loadMoviesList();
  }

  nextPage() {
    if (this.listCont.maxPage >= this.listCont.page) {
      this.listCont.page += 1;
      this.loadMoviesList();
    }
  }

  previousPage() {
    if (this.listCont.page >= 1) {
      this.listCont.page -= 1;
      this.loadMoviesList();
    }
  }
}
