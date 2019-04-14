import { Component, OnInit, Input, Output } from '@angular/core';
import { PostCard } from '../post-card';
import { LocalizationService } from '../localization.service';
import { Localization } from '../localization';

@Component({
  selector: 'app-posts-horizontal',
  templateUrl: './posts-horizontal.component.html',
  styleUrls: ['./posts-horizontal.component.scss']
})
export class PostsHorizontalComponent implements OnInit {
  ui: Localization;
  postClass: string;
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
