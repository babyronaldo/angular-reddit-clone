import {Component, Input, OnInit} from '@angular/core';
import {PostModel} from '../post-model';
import {faArrowDown, faArrowUp} from '@fortawesome/free-solid-svg-icons';
import {VoteService} from "../vote.service";
import {AuthService} from "../../auth/shared/auth.service";
import {PostService} from "../post.service";
import {ToastrService} from "ngx-toastr";
import {VotePayload} from "./vote-payload";
import {VoteType} from "./vote-type";
import {throwError} from "rxjs";

@Component({
  selector: 'app-vote-button',
  templateUrl: './vote-button.component.html',
  styleUrls: ['./vote-button.component.css']
})
export class VoteButtonComponent implements OnInit {
  @Input() post: PostModel;
  faArrowUp = faArrowUp;
  faArrowDown = faArrowDown;
  upvoteColor: string;
  downvoteColor: string;
  votePayload: VotePayload;

  constructor(private voteService: VoteService, private authService: AuthService, private postService: PostService,
              private toastrService: ToastrService) {
    this.votePayload = {
      voteType: undefined,
      postId: undefined
    }
  }

  ngOnInit(): void {
  }

  upvotePost() {
    this.votePayload.voteType = VoteType.UPVOTE;
    this.vote();
    this.downvoteColor = '';
  }

  downvotePost() {
    this.votePayload.voteType = VoteType.DOWNVOTE;
    this.vote();
    this.upvoteColor = '';
  }

  private vote() {
    this.votePayload.postId = this.post.id;
    this.voteService.vote(this.votePayload).subscribe(data => {
      this.updateVoteDetails();
    }, error => {
      this.toastrService.error(error.error.message);
      throwError(error);
    })
  }

  private updateVoteDetails() {
    this.postService.getPost(this.post.id).subscribe(data => {
      this.post = data;
    })
  }

}
