import { Component, OnInit, ViewChild } from '@angular/core';
import {PageScrollConfig} from 'ng2-page-scroll';
import {MatStepper} from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from '../http.service';
import { UserCard } from '../user-card';
import { PostCard } from '../post-card';
import { Step } from '../step';
import { LocalizationService } from '../localization.service';
import { Localization } from '../localization';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
  
})
export class PostComponent implements OnInit {

@ViewChild('stepper') stepper: MatStepper;
ui: Localization;
urlSafe: SafeResourceUrl;
  constructor(
    public sanitizer: DomSanitizer,
    private route: ActivatedRoute,
    private httpService: HttpService,
    private router: Router,
    private localizationService: LocalizationService
  ) { 
    PageScrollConfig.defaultScrollOffset = 110;
}
  post: PostCard;
  postId: string;
  user: UserCard;
  currentUser: string;
  isLoaded: boolean;
  steps: Step[];
  liked: boolean;
  isLoggedIn: boolean;
  formData: FormData = new FormData();
  categoryLocal: string;

  ngOnInit() {
    this.localizationService.subject.subscribe( ui => {
      this.ui = ui;
    });
    this.ui = this.localizationService.ui;
    this.postId = this.route.snapshot.paramMap.get('id');
    this.isLoaded = false;
    if (localStorage.getItem('currentUser')) {
      this.isLoggedIn = true;
      this.currentUser = localStorage.getItem('currentUser');
    }
    this.getPost();
  }

  getPost(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.httpService.getPost(id)
    .subscribe((data) => {
      if (!data.author) {
        this.router.navigate(['/main']);
      }
      this.post = data;
      this.categoryLocal = this.localizationService.getCategory(this.post.category);
      this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.post.videoLink);
      this.checkStars(id,localStorage.getItem('currentUser'));
      this.getUser(this.post.author);
      this.getSteps(data.post_id, data.numSteps);
    });
    
    
  }

  checkStars(id,login) {
    this.httpService.checkStars(id,login).subscribe(result => {
      if (''+result === 'true'){
        this.liked = true;
        
      }
    });   
  }

  getUser(author): void {
    this.httpService.getUser(author)
      .subscribe(user => {
        this.user = user;
       
      });
  }

  getSteps(postId, numSteps): void {
    this.httpService.getSteps(postId, numSteps)
      .subscribe(data => {
        this.steps = data;
       
        this.isLoaded = true;
      });
  }

  toggle(event): void {
    if (!event.target.closest('#panel').nextElementSibling.getAttribute('hidden')) {
      event.target.closest('#panel').nextElementSibling.setAttribute('hidden', 'true');  
    } else {
      event.target.closest('#panel').nextElementSibling.removeAttribute('hidden');
    }
  } 

  updateStars(value) {
    this.formData.append('value', value);
    this.formData.append('post_id', ''+this.post.post_id);
    this.formData.append('author', this.post.author);
    this.formData.append('login', localStorage.getItem('currentUser'));
    this.httpService.updateStars(this.formData).subscribe(data => {
      console.log(data);
    });
    this.liked = true;
    const score = +value;
    const rait =  +this.post.raiting;
    console.log(score + rait);
    document.getElementById('postRaiting').innerHTML = "★ "+(rait+score);
  }

}
