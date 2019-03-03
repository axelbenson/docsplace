import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../http.service';
import { MessageService } from 'primeng/api';
import { SharedService } from '../shared.service';
import { PostCard } from '../post-card';
import { Response } from '../response';
import { LocalizationService } from '../localization.service';
import { Localization } from '../localization';

@Component({
  selector: 'app-editable-posts',
  templateUrl: './editable-posts.component.html',
  styleUrls: ['./editable-posts.component.scss']
})
export class EditablePostsComponent implements OnInit {
  ui: Localization;
  wait: boolean;
  postId: number;
  formData: FormData = new FormData();

  @Input() postCards: PostCard[];
  constructor(
    private httpService: HttpService,
    private messageService: MessageService,
    private router: Router,
    private sharedService: SharedService,
    private localizationService: LocalizationService
  ) { 
    this.router.routeReuseStrategy.shouldReuseRoute = function() {
      return false;
    };
  }

  ngOnInit() {
    this.localizationService.subject.subscribe( ui => {
      this.ui = ui;
    });
    this.ui = this.localizationService.ui;
  }

  catch(id) {
    this.postId = id;
  }

  deletePost() {
    this.wait = true;
    this.formData.append('postId',''+this.postId);
    this.httpService.deletePost(this.formData).subscribe((data: Response)=> {
        if (data.error == "") {
          this.messageService.add({severity:'success', summary:'Succes', detail:data.success});
          this.sharedService.IsDeletedPost.next(true);
        } else {
          this.messageService.add({severity:'error', summary:'Error', detail:data.error});
        }
        if (data) {this.wait = false;}
        
      });
  }

  getCategory(category){
    return this.localizationService.getCategory(category);
  }
}
