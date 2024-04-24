import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Photo } from 'src/app/interfaces/photos/photo';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class PhotosService {

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  urlApi: string = `${environment.baseUrl}/photos`

  getPhotosByAlbumId(albumId: string): Observable<Photo[]> {
    return this.http.get<Photo[]>(`${this.urlApi}?albumId=${albumId}`);
  }

  getPhotoById(photoId: string): Observable<Photo> {
    return this.http.get<Photo>(`${this.urlApi}/${photoId}`);
  }
}
