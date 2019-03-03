import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute } from '@angular/router';
import { PostCard } from '../post-card';
import { LocalizationService } from '../localization.service';
import { Localization } from '../localization';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  ui: Localization;
  postCards: PostCard[];
  isLoaded: boolean;
  category: string;
  categoryLocal: string;
  constructor(
    private route: ActivatedRoute,
    private httpService: HttpService,
    private localizationService: LocalizationService
  ) { }

  ngOnInit() {
    this.category = this.route.snapshot.paramMap.get('category');
    this.categoryLocal = this.localizationService.getCategory(this.category);
    this.getPostCards();
  }

  getPostCards(): void {
    this.httpService.getCategoryCards(this.category)
    .subscribe(data => {
      this.postCards = data;
      this.isLoaded = true;
    });
  }

}
