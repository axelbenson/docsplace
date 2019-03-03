import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  
  isLoaded: boolean;
  
  constructor(private sharedService: SharedService) {
    this.sharedService.IsLoaded.subscribe( value => {
    this.isLoaded = value;
  });
  }
  
  ngOnInit() {
  }

}
