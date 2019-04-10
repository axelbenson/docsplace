import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { PostCard } from '../post-card';
import { SharedService } from '../shared.service';
import { LocalizationService } from '../localization.service';
import { Localization } from '../localization';

@Component({
  selector: 'app-recent-posts',
  templateUrl: './recent-posts.component.html',
  styleUrls: ['./recent-posts.component.scss']
})
export class RecentPostsComponent implements OnInit {
  postCards: PostCard[];
  ui: Localization;
  constructor(
    private httpService: HttpService,
    private sharedService: SharedService,
    private localizationService: LocalizationService
  ) { }

  ngOnInit() {
    this.localizationService.subject.subscribe( ui => {
      this.ui = ui;
    });
    this.ui = this.localizationService.ui;
    this.sharedService.IsLoaded.next(false);
    this.getPostCards();
  }

  getPostCards(): void {
    this.httpService.getRecentPostCards()
    .subscribe(data => {
      this.postCards = data;
      this.sharedService.IsLoaded.next(true);
    });
  }

}
