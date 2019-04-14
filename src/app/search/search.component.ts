import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { SharedService } from '../shared.service';
import { PostCard } from '../post-card';
import { LocalizationService } from '../localization.service';
import { Localization } from '../localization';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  ui: Localization;
  postCards: PostCard[];
  isLoaded: boolean;
  gridView: boolean;

  constructor(
    private httpService: HttpService,
    private sharedService: SharedService,
    private localizationService: LocalizationService
  ) {
      this.sharedService.SetSearchRequest.subscribe( value => {
      this.search(this.sharedService.SearchRequest);
  });
   }

  ngOnInit() {
    this.localizationService.subject.subscribe( ui => {
      this.ui = ui;
    });
    this.ui = this.localizationService.ui;

    this.search(this.sharedService.SearchRequest);
  }

  search(request): void {
    this.isLoaded = false;
    this.httpService.search(request)
    .subscribe(data =>{
       this.postCards = data
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
