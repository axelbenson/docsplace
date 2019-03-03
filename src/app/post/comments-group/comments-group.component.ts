import { Component, OnInit, Input, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { HttpService } from '../../http.service';
import { Comment } from '../../comment';
import { LocalizationService } from '../../localization.service';
import { Localization } from '../../localization';

@Component({
  selector: 'app-comments-group',
  templateUrl: './comments-group.component.html',
  styleUrls: ['./comments-group.component.scss']
})
export class CommentsGroupComponent implements OnInit {
  ui: Localization;
  comments: Comment[];
  currentUser: string;
  liked: boolean;
  formData: FormData = new FormData();
  commentData: FormData = new FormData();
  comment = new FormControl('');
  @Input() postId: number;
  constructor(
    private httpService: HttpService,
    private localizationService: LocalizationService
  ) { }

  ngOnInit() {
    this.localizationService.subject.subscribe( ui => {
      this.ui = ui;
    });
    this.ui = this.localizationService.ui;

    this.currentUser = localStorage.getItem('currentUser');
    this.getComments(this.postId, this.currentUser);
    setInterval(()=> {
      this.getComments(this.postId, this.currentUser); },4000); 

  }

  getComments(postId, login): void {
    this.httpService.getComments(postId, login).subscribe((data: Comment[]) => {
      this.comments = data;
    });
  }

  updateLikes(target, type, author, id): void {
    target.parentElement.children[2].removeAttribute('hidden');
    this.formData = new FormData;
    this.formData.append('type', type);
    this.formData.append('id', id);
    this.formData.append('author', author);
    this.formData.append('login', this.currentUser);
    this.httpService.updateLikes(this.formData).subscribe(data => {
      console.log();
    });
    this.getComments(this.postId, this.currentUser);
  }

  addComment() {
    this.commentData = new FormData;
    this.commentData.append('postId', ''+this.postId);
    this.commentData.append('login', this.currentUser);
    this.commentData.append('text', this.comment.value);
    this.httpService.addComment(this.commentData).subscribe(data => {
      console.log(data);
    });
    this.getComments(this.postId, this.currentUser);
  }

  keypress(event): void {  
    event.preventDefault();
    event.target.value = '';
    this.addComment();
  }

}
