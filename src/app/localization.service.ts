import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Localization } from './localization';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalizationService {
  public subject = new Subject<any>();
  public ui: Localization;
  constructor(private httpService: HttpService) { }

  getLanguage(language) {
    this.httpService.getLanguage(language).subscribe( (ui: Localization) => {
      this.ui = ui;
      this.subject.next(this.ui);
      
  });
  }

  getCategory(category) {
    switch (category) {
      case ('Hobbies'):
        return this.ui.hobbies;
      case ('Apartment'):
        return this.ui.apartment;
      case ('Sport'):
        return this.ui.sport;
      case ('Internet'):
        return this.ui.internet;
      case ('Auto'):
        return this.ui.auto;
      case ('Health'):
        return this.ui.health;
      case ('Food'):
        return this.ui.food;
      case ('Fashion'):
        return this.ui.fashion;
      case ('Engineering'):
        return this.ui.engineering;
      case ('Other'):
        return this.ui.other;
    }
  }
}
