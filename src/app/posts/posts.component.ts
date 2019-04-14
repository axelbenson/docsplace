import { Component, OnInit, Input, Output } from '@angular/core';
import { PostCard } from '../post-card';
import { LocalizationService } from '../localization.service';
import { Localization } from '../localization';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  ui: Localization;
  postClass: string;
  @Input() postCards: PostCard[];
  constructor(private localizationService: LocalizationService) { }

  ngOnInit() {
    this.localizationService.subject.subscribe( ui => {
      this.ui = ui;
    });
    this.ui = this.localizationService.ui;
    if (document.getElementById('top-users')) {
      this.postClass = 'col-lg-4 col-md-6 mb-4';
    } else {
      this.postClass = 'col-lg-3 col-md-6 mb-4';
    }
  }

  getCategory(category){
    return this.localizationService.getCategory(category);
  }
}
