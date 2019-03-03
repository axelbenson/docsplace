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

}
