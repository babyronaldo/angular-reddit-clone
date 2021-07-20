import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CommentPayload} from './coment-payload';
import * as global from '../globals';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) {
  }

  getAllCommentsForPost(postId: number): Observable<CommentPayload[]> {
    return this.http.get<CommentPayload[]>(global.APIServer + '/comments/post/' + postId);
  }

  postComment(commentPayload: CommentPayload): Observable<CommentPayload> {
    return this.http.post<CommentPayload>(global.APIServer + '/comments', commentPayload);
  }

  getAllCommentsByUser(username: string) {
    return this.http.get<CommentPayload[]>(global.APIServer + '/comments/user/' + username);
  }
}
