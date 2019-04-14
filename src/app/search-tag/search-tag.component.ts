import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from '../http.service';
import { PostCard } from '../post-card';
import { LocalizationService } from '../localization.service';
import { Localization } from '../localization';

@Component({
  selector: 'app-search-tag',
  templateUrl: './search-tag.component.html',
  styleUrls: ['./search-tag.component.scss']
})
export class SearchTagComponent implements OnInit {
  ui: Localization;
  postCards: PostCard[];
  isLoaded: boolean;
  gridView: boolean;

  constructor(
    private route: ActivatedRoute,
    private httpService: HttpService,
    private localizationService: LocalizationService
  ) { }

  ngOnInit() {
    this.localizationService.subject.subscribe( ui => {
      this.ui = ui;
    });
    this.ui = this.localizationService.ui;
    this.getCards();
  }

  getCards(): void {
    const tag = this.route.snapshot.paramMap.get('tag');
    this.httpService.getPostCardsByTag(tag)
      .subscribe(data => {
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
