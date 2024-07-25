/* import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DeezerService } from '../services/deezer.service';
import { Album } from '../models/album.model';

@Component({
  selector: 'app-artist-search',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './artist-search.component.html',
  styleUrls: ['./artist-search.component.css']
})
export class ArtistSearchComponent {
  artistName: string = 'Монеточка';
  albums: Album[] = [];
  limit: number = 25; // дизер выдаёт альбомы постранично, по 25 штук
  index: number = 0;

  constructor(private deezerService: DeezerService) { }

  search() {
    this.albums = [];
    if (this.artistName.trim()) {
      this.deezerService.searchArtist(this.artistName).subscribe({
        next: data => {
          if (data && data.data && data.data.length > 0) {
            const artistId = data.data[0].id;
            this.loadAllAlbums(artistId);
          } else {
            this.albums = [];
            alert('Нет альбомов');
          }
        },
        error: error => {
          if (error.status === 403) {
            alert('Ошибка 403, не надо так быстро отправлять запросы:)');
          } else {
            alert('Ошибка при получении данных артиста');
          }
        }
      });
    } else {
      alert('Неизвестный артист');
    }
  }

  loadAllAlbums(artistId: number) {
    this.getAlbums(artistId, 0);
  }

  getAlbums(artistId: number, index: number) {
    this.deezerService.getArtistAlbums(artistId, this.limit, index).subscribe({
      next: albumData => {
        if (albumData && albumData.data && albumData.data.length > 0) {
          this.albums = this.albums.concat(albumData.data);
          if (albumData.total > this.albums.length) {
            this.getAlbums(artistId, this.albums.length);
          }
        } else {
          alert('Больше нет альбомов');
        }
      },
      error: error => {
        alert('Какая-то неведомая ошибка');
        console.error('Error fetching albums:', error);
      }
    });
  }
} */

// =============================================================================

import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DeezerService } from '../services/deezer.service';
import { Album } from '../models/album.model';
import { catchError, tap } from 'rxjs/operators';
import { EMPTY } from 'rxjs';

@Component({
  selector: 'app-artist-search',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './artist-search.component.html',
  styleUrls: ['./artist-search.component.css']
})
export class ArtistSearchComponent {
  artistName: string = 'Монеточка';
  albums: Album[] = [];
  limit: number = 25; // дизер выдаёт альбомы постранично, по 25 штук
  index: number = 0;

  constructor(private deezerService: DeezerService) { }

  search() {
    this.albums = [];
    if (this.artistName.trim()) {
      this.deezerService.searchArtist(this.artistName).pipe(
        tap(data => {
          if (data && data.data && data.data.length > 0) {
            const artistId = data.data[0].id;
            this.loadAllAlbums(artistId);
          } else {
            this.albums = [];
            alert('Нет альбомов');
          }
        }),
        catchError(error => {
          if (error.status === 403) {
            alert('Ошибка 403, не надо так быстро отправлять запросы:)');
          } else {
            alert('Ошибка при получении данных артиста');
          }
          return EMPTY;
        })
      ).subscribe();
    } else {
      alert('Неизвестный артист');
    }
  }

  loadAllAlbums(artistId: number) {
    this.getAlbums(artistId, 0);
  }

  getAlbums(artistId: number, index: number) {
    this.deezerService.getArtistAlbums(artistId, this.limit, index).pipe(
      tap(albums => {
        if (albums && albums.length > 0) {
          this.albums = this.albums.concat(albums);
          if (this.albums.length < this.limit) {
            this.getAlbums(artistId, this.albums.length);
          }
        } else {
          // alert('Больше нет альбомов');
        }
      }),
      catchError(error => {
        alert('Какая-то неведомая ошибка');
        console.error('Error fetching albums:', error);
        return EMPTY;
      })
    ).subscribe();
  }
}

// =============================================================================

// основные правки внесены в файлы:

// app.config.ts
// proxy.conf.json
// anпular.json