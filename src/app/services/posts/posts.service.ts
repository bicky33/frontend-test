import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from 'src/app/interfaces/posts/post';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  urlApi: string = process.env['baseUrl'] ?? `${environment.baseUrl}/posts`

  getPostsByUserId(userId: string): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.urlApi}?userId=${userId}`);
  }
  getPostById(postId: number): Observable<Post> {
    return this.http.get<Post>(`${this.urlApi}/${postId}`);
  }

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.urlApi);
  }

  createPost(post: Post): Observable<Post> {
    return this.http.post<Post>(this.urlApi, post, this.httpOptions);
  }

  updatePost(post: Post): Observable<Post> {
    return this.http.put<Post>(`${this.urlApi}/${post.id}`, post, this.httpOptions);
  }

  deletePost(postId: number): Observable<Post> {
    return this.http.delete<Post>(`${this.urlApi}/${postId}`);
  }

}
