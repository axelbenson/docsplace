import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { UserCard } from '../user-card';
import { LocalizationService } from '../localization.service';
import { Localization } from '../localization';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  ui: Localization;
  userCards: UserCard[];
  isLoaded: boolean;
  constructor(private httpService: HttpService,
    private localizationService: LocalizationService) { }

  ngOnInit() {
    this.localizationService.subject.subscribe( ui => {
      this.ui = ui;
    });
    this.ui = this.localizationService.ui;
    this.getUserCards();
  }

  getUserCards(): void {
    this.httpService.getUserCards()
    .subscribe(data => {
      this.userCards = data;
    this.isLoaded = true;
    });
  }
}
