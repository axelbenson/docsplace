import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Response } from '../response';
import {MatChipInputEvent} from '@angular/material';
import {ENTER} from '@angular/cdk/keycodes';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '../http.service';
import { SharedService } from '../shared.service';
import { PostCard } from '../post-card';
import { Step } from '../step';
import { LocalizationService } from '../localization.service';
import { Localization } from '../localization';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ChangeEvent } from '@ckeditor/ckeditor5-angular/ckeditor.component';


export interface Section {
  value: string;
  label: any;
}

export interface Tag {
  tag: string;
}

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {
  public Editor = ClassicEditor;
  public onChange( { editor }: ChangeEvent ) {
    this.markdown.setValue(editor.getData());
  }
  public config = {
    language: localStorage.getItem('language') || 'en',
    placeholder: '...'
  };

  ui: Localization;
  sections: Section[];
  
  constructor(
    private messageService: MessageService,
    private router: Router,
    private route: ActivatedRoute,
    private httpService: HttpService,
    private localizationService: LocalizationService
  ) { }
  
  post: PostCard;
  postId: string;
  counter: number;
  file_counter: number;
  step: Node;
  formData: FormData = new FormData();
  fileLoaded: boolean;
  wait: boolean;
  tags : Array<string> = [];
  currentUser: string;
  isLoaded: boolean;
  steps: Step[];

  name = new FormControl('', Validators.required );
  section = new FormControl('', Validators.required );
  short = new FormControl('', [Validators.required, Validators.maxLength(150)] );
  full = new FormControl('', Validators.required );
  markdown = new FormControl('');
  videoLink = new FormControl('');

  ngOnInit() {
    this.localizationService.subject.subscribe( ui => {
      this.ui = ui;
    });
    this.ui = this.localizationService.ui;

    setTimeout(()=> {
      this.sections = [
        {value:'IT', label: this.ui.it},
        {value:'HR',label: this.ui.hr},
        {value:'Tech',label: this.ui.tech},
        {value:'Finance',label: this.ui.finance},
        {value:'Legal',label: this.ui.legal},
        {value: 'Other',label: this.ui.other}
      ];
    },1000);

    this.postId = this.route.snapshot.paramMap.get('id');
    if (localStorage.getItem('currentUser')) {
      this.currentUser = localStorage.getItem('currentUser');
    }
    this.getPost();
    this.step = document.getElementById('step').cloneNode(true);
    this.counter = 1;
    this.file_counter = -1;
    this.wait = false;
    this.tags = ['howto'];
    document.getElementById('head').removeAttribute('aria-controls')
    
    let inputs = document.getElementsByName('pic');
    for (let a = 0; a < inputs.length; a++) {
      inputs[a].addEventListener('change', this.onFileUpload);
    }

  }
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER];

  getPost(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.httpService.getPost(id)
    .subscribe((data) => {
      this.post = data;
      if (this.post.author != this.currentUser) {
        this.router.navigate(['/main']);
      }
      this.section.setValue(this.post.category);
      this.getSteps(data.post_id, data.numSteps);
    });
  }

  getSteps(postId, numSteps): void {
    this.httpService.getSteps(postId, numSteps)
      .subscribe(data => {
        this.steps = data;
        this.isLoaded = true;
      });
  }

  autogrow(event){
    let  textArea = event.target;       
    textArea.style.overflow = 'hidden';
    textArea.style.height = '0px';
    textArea.style.height = textArea.scrollHeight + 'px';
  }

  add_step(): void {
    let temp = this.step.cloneNode(true);
    this.counter = this.counter+1;
    temp.firstChild.firstChild.firstChild.firstChild.firstChild.textContent = this.counter+'';
    temp.addEventListener('keyup', this.autogrow);
    document.getElementById('add_step').parentElement.insertBefore(temp,document.getElementById('add_step'));
   }

  handleSpacebar(ev) {
    if (ev.keyCode === 32) {
      ev.stopPropagation();
    }
   }

  onFileUpload = (event: Event) => {
    this.fileLoaded = true;
    const target: HTMLInputElement = <HTMLInputElement>event.target;
    const files: FileList = target.files;
    const step = target.getAttribute('step');
    target.nextElementSibling.firstElementChild.removeAttribute('hidden');
    target.nextElementSibling.children[1].setAttribute('hidden', 'true');

  
    for (let i = 0; i < files.length; i++) {
      this.formData.append('file'+step, files[i]);
    }
  }

  send(): void {
    this.wait = true;
    this.formData.append('postId', ''+this.post.post_id);
    if (!this.name.value){
      this.formData.append('name', this.post.title);
    } else {
      this.formData.append('name', this.name.value);
    }
    if (!this.short.value){
      this.formData.append('short', this.post.description);
    } else {
      this.formData.append('short', this.short.value);
    }
    if (!this.full.value){
      this.formData.append('full', this.post.fullDescription);
    } else {
      this.formData.append('full', this.full.value);
    }
    if (!this.section.value){
      this.formData.append('section', this.post.category);
    } else {
      this.formData.append('section', this.section.value);
    }
    if (!this.videoLink.value){
      this.formData.append('videoLink', this.post.videoLink);
    } else {
      this.formData.append('videoLink', this.videoLink.value);
    }
    if (!this.markdown.value) {
      this.formData.append('instruction', this.post.instruction);
    } else {
      this.formData.append('instruction', this.markdown.value);
    }
    this.formData.append('numSteps', ''+this.post.numSteps);
    this.formData.append('author', localStorage.getItem('currentUser'));
  
    for (let a = 0; a < this.post.numSteps; a++)
    {
      let node = <HTMLInputElement>(document.getElementById('form10'))
      this.formData.append('stepDesc'+(a+1), node.value);
      this.formData.append('stepId'+(a+1), ''+this.steps[a].id);
      document.getElementById('form10').setAttribute('id','form1');
    }

    for (let a = 0; a < this.post.numSteps; a++)
    {
      let node = <HTMLInputElement>(document.getElementById('form-step-name'))
      this.formData.append('stepName'+(a+1), node.value);
      document.getElementById('form-step-name').setAttribute('id','form1');
    }

    for (let a = 0; a < this.post.numSteps; a++) {
      let node = <HTMLInputElement>(document.getElementById('form-step-videoLink'))
      this.formData.append('stepVideoLink'+(a+1), node.value);
        document.getElementById('form-step-videoLink').setAttribute('id','form1');
    }
  
    this.httpService.editPost(this.formData).subscribe((data: Response)=> {
        if (data.error == "") {
          this.messageService.add({severity:'success', summary:'Succes', detail:data.success});
          this.router.navigate(['/user/'+localStorage.getItem('currentUser')]);
        } else {
          this.messageService.add({severity:'error', summary:'Error', detail:data.error});
        }
        if (data) {this.wait = false;}
        
      });
     
   
  }
}
