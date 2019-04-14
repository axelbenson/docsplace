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
  gridView: boolean;

  constructor(
    private route: ActivatedRoute,
    private httpService: HttpService,
    private localizationService: LocalizationService
  ) { }

  ngOnInit() {
    this.category = this.route.snapshot.paramMap.get('category');
    this.getPostCards();
  }

  getPostCards(): void {
    this.httpService.getCategoryCards(this.category)
    .subscribe(data => {
      if (data[0]) {
        this.categoryLocal = this.localizationService.getCategory(data[0].category);
      }
      this.postCards = data;
      this.isLoaded = true;
    });
  }

  updateGridView(event): void {
    if (!event.target.classList.contains('active')) {
      this.gridView = !this.gridView;
      document.querySelector('i.active').classList.remove('active');
      event.target.classList.add('active');
    }
  }

  sortGridView(event, type: string): void {
    if (!event.target.classList.contains('sort-active')) {
      document.querySelector('i.sort-active').classList.remove('sort-active');
      event.target.classList.add('sort-active');
      switch (type) {
        case 'title-down':
          this.postCards.sort((a, b) => {
            if (a.title < b.title) return -1;
            else if (a.title > b.title) return 1;
            else return 0;
          });
          break;
        case 'title-up':
          this.postCards.sort((a, b) => {
            if (a.title > b.title) return -1;
            else if (a.title < b.title) return 1;
            else return 0;
          });
          break;
        case 'date-down':
          this.postCards.sort((a, b) => {
            if (a.date < b.date) return -1;
            else if (a.date > b.date) return 1;
            else return 0;
          });
          break;
        case 'date-up':
          this.postCards.sort((a, b) => {
            if (a.date > b.date) return -1;
            else if (a.date < b.date) return 1;
            else return 0;
          });
          break;  
      }
    }
  }
}
