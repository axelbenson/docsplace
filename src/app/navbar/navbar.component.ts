import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';
import { LocalizationService } from '../localization.service';
import { Localization } from '../localization';
import { Router } from '@angular/router';
import { ENTER } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  language: string;
  ui: Localization;
  isUserLoggedIn: boolean;
  login: string;
  su: boolean;
  suMode: boolean;
  search: boolean;
  constructor(
    private sharedService: SharedService,
    private router: Router,
    private localizationService: LocalizationService
  ) { 
    this.router.routeReuseStrategy.shouldReuseRoute = function() {
      return false;
    };
    this.localizationService.subject.subscribe( ui => {
      this.ui = ui;
    });
    this.sharedService.IsUserLoggedIn.subscribe( value => {
      this.isUserLoggedIn = value;
      this.login = localStorage.getItem('currentUser');
      if (localStorage.getItem('su')) {
        this.su = true;
      }
      if (this.su == true) {
        if (this.login != localStorage.getItem('su')) {
          this.suMode = true;
        } else {
          this.suMode = false;
        }
        
      }
  });
    this.sharedService.NoMoreSu.subscribe( value => {
    this.su = !value;
});
  }

  ngOnInit() {
    this.language = localStorage.getItem('language');

    if (localStorage.getItem('su')) {
      this.su = true;
    }
    this.login = localStorage.getItem('currentUser');
    if (this.login) {
      this.sharedService.IsUserLoggedIn.next(true);
      if ((this.su == true) && (this.login != localStorage.getItem('su'))) {
        this.suMode = true;
      }
    }
    
    
  }

  logout(): void {
    localStorage.setItem('currentUser', "");
    localStorage.setItem('su','');
    this.su = false;
    this.sharedService.IsUserLoggedIn.next(false);
    this.router.navigate(['/']);
  }

  leave() {
    localStorage.setItem('currentUser', localStorage.getItem('su'));
    this.suMode = false;
    this.sharedService.IsUserLoggedIn.next(true);
  }

  routeToUser() {
    this.router.navigateByUrl('/user/'+this.login);
  }

  keypress(key, event): void {
    if (key == ENTER) {
      this.sharedService.SearchRequest = event.target.value;
      this.sharedService.SetSearchRequest.next(true);
      this.router.navigate(['/search']);
    } 
  }

  changeLanguage(language) {
    localStorage.setItem('language', language);
    window.location.reload();
  }
}
