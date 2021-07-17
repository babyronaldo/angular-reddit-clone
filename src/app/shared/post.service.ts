import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {PostModel} from './post-model';
import {CreatePostPayload} from "../post/create-post/create-post-payload";

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) {
  }

  getAllPosts(): Observable<Array<PostModel>> {
    return this.http.get<Array<PostModel>>('http://localhost:8080/api/posts/');
  }

  createPost(createPost: CreatePostPayload): Observable<CreatePostPayload> {
    return this.http.post<CreatePostPayload>('http://localhost:8080/api/posts/', createPost);
  }

}
