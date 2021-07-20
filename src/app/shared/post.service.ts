import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {PostModel} from './post-model';
import {CreatePostPayload} from '../post/create-post/create-post-payload';
import * as global from '../globals';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) {
  }

  getAllPosts(): Observable<Array<PostModel>> {
    return this.http.get<Array<PostModel>>(global.APIServer + '/posts');
  }

  createPost(createPost: CreatePostPayload): Observable<CreatePostPayload> {
    return this.http.post<CreatePostPayload>(global.APIServer + '/posts/', createPost);
  }

  getPost(id: number): Observable<PostModel> {
    return this.http.get<PostModel>(global.APIServer + '/posts/' + id);
  }

  getAllPostsByUser(username: string): Observable<PostModel[]> {
    return this.http.get<PostModel[]>(global.APIServer + '/posts/user/' + username);
  }

}
