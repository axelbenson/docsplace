import { Component } from '@angular/core';
import { LocalizationService } from './localization.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  constructor(private localizationService: LocalizationService){
    this.localizationService.getLanguage((localStorage.getItem('language') || 'ru'));
   
  }
}
