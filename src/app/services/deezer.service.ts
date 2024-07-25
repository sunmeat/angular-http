/* import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Album } from '../models/album.model'; 

@Injectable({
  providedIn: 'root'
})
export class DeezerService {
  // CORS error
  // https://developer.mozilla.org/ru/docs/Web/HTTP/CORS
  // https://medium.com/weekly-webtips/do-you-know-how-to-resolve-cors-issues-in-angular-9d818474825f
  proxyUrl: string = 'https://cors-anywhere.herokuapp.com/';
  apiUrl: string = 'https://api.deezer.com/';
  searchArtistUrl: string = 'search/artist?q=';
  artistAlbumsUrl: string = 'artist/';
  albumsEndpoint: string = '/albums';

  constructor(private http: HttpClient) { }

  searchArtist(query: string): Observable<any> {
    const url = `${this.proxyUrl}${this.apiUrl}${this.searchArtistUrl}${encodeURIComponent(query)}`;
    return this.http.get<any>(url);
  }

  getArtistAlbums(artistId: number, limit: number = 25, index: number = 0): Observable<{ data: Album[], total: number }> {
    const url = `${this.proxyUrl}${this.apiUrl}${this.artistAlbumsUrl}${artistId}${this.albumsEndpoint}?limit=${limit}&index=${index}`;
    return this.http.get<{ data: Album[], total: number }>(url);
  }
} */

// ======================================================================================

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Album } from '../models/album.model'; 

@Injectable({
  providedIn: 'root'
})

export class DeezerService {
  proxyUrl: string = 'https://cors-anywhere.herokuapp.com/';
  apiUrl: string = 'https://api.deezer.com/';
  searchArtistUrl: string = 'search/artist?q=';
  artistAlbumsUrl: string = 'artist/';
  albumsEndpoint: string = '/albums';

  constructor(private http: HttpClient) {}

  searchArtist(query: string): Observable<any> {
    const url = `${this.proxyUrl}${this.apiUrl}${this.searchArtistUrl}${encodeURIComponent(query)}`;
    return this.http.get<any>(url).pipe(
      catchError(error => {
        return throwError(() => new Error('ошибка в методе searchArtist'));
      })
    );
  }

  getArtistAlbums(artistId: number, limit: number = 25, index: number = 0): Observable<Album[]> {
    const url = `${this.proxyUrl}${this.apiUrl}${this.artistAlbumsUrl}${artistId}${this.albumsEndpoint}?limit=${limit}&index=${index}`;
    return this.http.get<{ data: Album[], total: number }>(url).pipe(
      map(response => response.data), // использование map
      catchError(error => {
        return throwError(() => new Error('ошибка в методе getArtistAlbums'));
      })
    );
  }
}

// ======================================================================================

/*
Когда использовать HttpClient, а когда - RxJS?

HttpClient:
    когда вам нужны базовые HTTP-запросы с простой обработкой ответов и ошибок.
RxJS в сочетании с HttpClient, когда нужно:
    обрабатывать данные как потоки
    выполнять сложные операции с данными (например, комбинирование результатов нескольких запросов)
    управлять сложными асинхронными процессами и ошибками

В реальных приложениях часто используется комбинация HttpClient и RxJS,
где HttpClient делает запросы, а RxJS обрабатывает данные и ошибки.
Это даст максимальную гибкость
*/