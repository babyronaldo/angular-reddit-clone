import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {VotePayload} from './vote-button/vote-payload';
import {Observable} from 'rxjs';
import * as global from '../globals';

@Injectable({
  providedIn: 'root'
})
export class VoteService {

  constructor(private http: HttpClient) {
  }

  vote(votePayload: VotePayload): Observable<VotePayload> {
    return this.http.post<VotePayload>(global.APIServer + '/votes', votePayload);
  }
}
