import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Album } from 'src/app/interfaces/albums/album';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AlbumsService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  urlApi: string = `${environment.baseUrl}/albums`
  constructor(private http:HttpClient) { }

  getAlbumsByUserId(userId: string): Observable<Album[]> {
    return this.http.get<Album[]>(`${this.urlApi}?userId=${userId}`);
  }

  getAlbumById(albumId: string): Observable<Album> {
    return this.http.get<Album>(`${this.urlApi}/${albumId}`);
  }
}
