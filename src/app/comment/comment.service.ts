import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CommentPayload} from './coment-payload';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) {
  }

  getAllCommentsForPost(postId: number): Observable<CommentPayload[]> {
    return this.http.get<CommentPayload[]>('http://localhost:8080/api/comments/post/' + postId);
  }

  postComment(commentPayload: CommentPayload): Observable<CommentPayload> {
    return this.http.post<CommentPayload>('http://localhost:8080/api/comments', commentPayload);
  }

  getAllCommentsByUser(username: string) {
    return this.http.get<CommentPayload[]>('http://localhost:8080/api/comments/user/' + username);
  }
}
