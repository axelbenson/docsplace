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
      case ('IT'):
        return this.ui.it;
      case ('HR'):
        return this.ui.hr;
      case ('Tech'):
        return this.ui.tech;
      case ('Finance'):
        return this.ui.finance;
      case ('Legal'):
        return this.ui.legal;
      case ('Other'):
        return this.ui.other;
    }
  }
}
