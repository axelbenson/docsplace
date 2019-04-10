import { Component, OnInit, ViewChild } from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material';
import { HttpService } from '../http.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { UserCard } from '../user-card';
import { Response } from '../response';
import { SharedService } from '../shared.service';
import { LocalizationService } from '../localization.service';
import { Localization } from '../localization';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  ui: Localization;
  userCards: UserCard[];
  isLoaded: boolean;
  wait: boolean;
  formData: FormData = new FormData();

  displayedColumns: string[] = ['select', 'id', 'raiting', 'login', 'email', 'location', 'blocked', 'su'];
  dataSource: MatTableDataSource<UserCard>;
  selection = new SelectionModel<UserCard>(true, []);

  constructor(
    private httpService: HttpService,
    private messageService: MessageService,
    private router: Router,
    private sharedService: SharedService,
    private localizationService: LocalizationService
  ) {

    }

  ngOnInit() {
    this.localizationService.subject.subscribe( ui => {
      this.ui = ui;
    });
    this.ui = this.localizationService.ui;

    if (!localStorage.getItem('su')) {
      this.router.navigate(['/']);
    }
    
    this.getUserCards();
    
  }

  getUserCards(): void {
    this.httpService.getUserCards()
    .subscribe(data => {
      this.userCards = data;
      this.dataSource = new MatTableDataSource<UserCard>(this.userCards);
      this.isLoaded = true;
    
    });
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  signin(login) {
    localStorage.setItem('currentUser', login);
    this.sharedService.IsUserLoggedIn.next(true);
    this.router.navigate(['/user/',login]);
  }

  action(type) {
    this.wait = true;
    this.formData = new FormData;
    for (let a = 0; a < this.selection.selected.length; a++) {
      this.formData.append('data'+a, ''+this.selection.selected[a].id); 
    }
    this.formData.append('length', ''+this.selection.selected.length);
    this.formData.append('type', type);
    
    this.httpService.adminAction(this.formData).subscribe((data: Response)=> {
      if (data.error == "") {
        this.messageService.add({severity:'success', summary:'Succes', detail:data.success});
        for (let a = 0; a < this.selection.selected.length; a++)
        {
          if ((type == "notsu") && (localStorage.getItem('su') == this.selection.selected[a].login)) {
            localStorage.setItem('su','');
            this.sharedService.NoMoreSu.next(true);
            this.router.navigate(['/']);
          }
          if (((type == 'block') || (type == 'delete')) && (this.selection.selected[a].login == localStorage.getItem('currentUser'))) {
            localStorage.setItem('currentUser','');
            this.sharedService.IsUserLoggedIn.next(false);
            this.router.navigate(['/']);
          }
        }
        this.getUserCards();
        this.selection.clear();
       
      } else {
        this.messageService.add({severity:'error', summary:'Error', detail:data.error});
      }
      if (data) {this.wait = false;}
      
    });
  }

}
