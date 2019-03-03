import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { UserCard } from '../user-card';
import { LocalizationService } from '../localization.service';
import { Localization } from '../localization';

@Component({
  selector: 'app-top-users',
  templateUrl: './top-users.component.html',
  styleUrls: ['./top-users.component.scss']
})
export class TopUsersComponent implements OnInit {
  ui: Localization;
  userCards: UserCard[];
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
    this.httpService.getTopUserCards()
    .subscribe(data => this.userCards = data);
  }
}
