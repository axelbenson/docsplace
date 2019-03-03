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
  @Input() postCards: PostCard[];
  constructor(private localizationService: LocalizationService) { }

  ngOnInit() {
    this.localizationService.subject.subscribe( ui => {
      this.ui = ui;
    });
    this.ui = this.localizationService.ui;
  }

  getCategory(category){
    return this.localizationService.getCategory(category);
  }

}
