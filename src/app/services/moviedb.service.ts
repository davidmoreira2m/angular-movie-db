import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { MovieList } from '../model/movieList.model';
import { MovieDetails } from '../model/movieDetails.model';
import { MovieVideos } from '../model/movieVideos.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MoviedbService {
  private url: string = environment.moviedbUrl;
  private key: string = environment.moviedbKey;

  private headers = new HttpHeaders()
    .set('Authorization', 'Bearer ' + this.key)
    .set('Content-Type', 'application/json;charset=utf-8');

  constructor(private http: HttpClient) {}

  getMovies(
    typeList: string,
    idioma: string,
    page: number
  ): Observable<MovieList> {
    return this.http.get<MovieList>(
      `${this.url}${typeList}?api_key=${this.key}&language=${idioma}&page=${page}&adult=false`,
      {
        headers: this.headers,
      }
    );
  }

  getMovieDetails(id: number, idioma: string): Observable<MovieDetails> {
    return this.http.get<MovieDetails>(
      `${this.url}${id}?api_key=${this.key}&language=${idioma}`,
      {
        headers: this.headers,
      }
    );
  }

  getMovieVideos(id: number): Observable<MovieVideos> {
    return this.http.get<MovieVideos>(
      `
    ${this.url}${id}/videos?api_key=${this.key}&languageen-US`,
      {
        headers: this.headers,
      }
    );
  }
}
