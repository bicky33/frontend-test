import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import User from 'src/app/interfaces/users/user';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  urlApi: string = `${environment.baseUrl}/users`

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.urlApi);
  }

  getUserById(userId: string): Observable<User> {
    return this.http.get<User>(`${this.urlApi}/${userId}`);
  }
}
