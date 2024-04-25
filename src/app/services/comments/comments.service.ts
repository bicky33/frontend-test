import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Comment } from 'src/app/interfaces/comments/comment';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {
  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  urlApi: string = `${process.env['BaseURL']}/comments` ?? `${environment.baseUrl}/comments`

  getCommentsByPostId(postId: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.urlApi}?postId=${postId}`);
  };

  createComment(comment: Comment): Observable<Comment> {
    return this.http.post<Comment>(this.urlApi, comment, this.httpOptions);
  }

  deleteComment(commentId: number): Observable<Comment> {
    return this.http.delete<Comment>(`${this.urlApi}/${commentId}`);
  }

  updateComment(comment: Comment): Observable<Comment> {
    return this.http.put<Comment>(`${this.urlApi}/${comment.id}`, comment, this.httpOptions);
  }
}
