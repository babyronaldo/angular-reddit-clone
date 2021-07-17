import {Component, OnInit} from '@angular/core';
import {SubredditModel} from '../../subreddit/subreddit-model';
import {SubredditService} from "../../subreddit/subreddit.service";

@Component({
  selector: 'app-subreddit-side-bar',
  templateUrl: './subreddit-side-bar.component.html',
  styleUrls: ['./subreddit-side-bar.component.css']
})
export class SubredditSideBarComponent implements OnInit {

  subreddits: Array<SubredditModel> = [];
  displayViewAll: boolean = false;

  constructor(private subRedditService: SubredditService) { }

  ngOnInit(): void {
    this.subRedditService.getAllSubreddits().subscribe(data => {
      if (data.length > 3) {
        this.subreddits = data.slice(0, 3);
        this.displayViewAll = true;
      } else {
        this.subreddits = data;
      }
    });
  }

}
