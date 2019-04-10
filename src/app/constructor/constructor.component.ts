import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { HttpService } from '../http.service';
import { MessageService } from 'primeng/api';
import { Response } from '../response';
import {MatChipInputEvent} from '@angular/material';
import {ENTER} from '@angular/cdk/keycodes';
import { Router } from '@angular/router';
import { LocalizationService } from '../localization.service';
import { Localization } from '../localization';

export interface Section {
  value: string;
  label: any;
}

export interface Tag {
  tag: string;
}

@Component({
  selector: 'app-constructor',
  templateUrl: './constructor.component.html',
  styleUrls: ['./constructor.component.scss'],
  providers: [MessageService]
})
export class ConstructorComponent implements OnInit {
  ui: Localization;
  sections: Section[];
  
  constructor(
    private httpService: HttpService,
    private messageService: MessageService,
    private router: Router,
    private localizationService: LocalizationService
  ) { }
  
  counter: number;
  file_counter: number;
  step: Node;
  formData: FormData = new FormData();
  fileLoaded: boolean;
  wait: boolean;
  tags : Array<string> = [];

  name = new FormControl('', Validators.required );
  section = new FormControl('', Validators.required );
  short = new FormControl('', [Validators.required, Validators.maxLength(150)] );
  full = new FormControl('', Validators.required );
  needed = new FormControl('');
  videoLink = new FormControl('');

  ngOnInit() {
    if (!localStorage.getItem('currentUser')) {
      this.router.navigate(['/']);
    }
    this.localizationService.subject.subscribe( ui => {
      this.ui = ui;
    });
    this.ui = this.localizationService.ui;
    

    setTimeout(()=> {
      this.step = document.getElementById('step').cloneNode(true);
      let clone = this.step.cloneNode(true);
      document.getElementById('step').remove(); 
      clone.addEventListener('keyup', this.autogrow);
      clone.addEventListener('change', this.onFileUpload);
      document.getElementById('add_step').parentElement.insertBefore(clone,document.getElementById('add_step'));
      this.sections = [
        {value:'Hobbies', label: this.ui.hobbies},
        {value:'Apartment',label: this.ui.apartment},
        {value:'Sport',label: this.ui.sport},
        {value:'Internet',label: this.ui.internet},
        {value:'Auto',label: this.ui.auto},
        {value:'Health',label: this.ui.health},
        {value:'Food',label: this.ui.food},
        {value:'Fashion',label: this.ui.fashion},
        {value: 'Engineering',label: this.ui.engineering},
        {value: 'Other',label: this.ui.other}
      ];
    },1000);
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

    let inputs = document.getElementsByName('pic');
    for (let a = 0; a < inputs.length; a++) {
      inputs[a].addEventListener('change', this.onFileUpload);
    }
  }

  handleSpacebar(ev) {
    if (ev.keyCode === 32) {
      ev.stopPropagation();
    }
   }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our tag
    if ((value || '').trim()) {
      this.tags.push(value);
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(tag): void {
    const index = this.tags.indexOf(tag);
    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  onFileUpload = (event: Event) => {
    this.file_counter = this.file_counter+1;
    this.fileLoaded = true;
    const target: HTMLInputElement = <HTMLInputElement>event.target;
    const files: FileList = target.files;
    target.nextElementSibling.firstElementChild.removeAttribute('hidden');
    target.nextElementSibling.children[1].setAttribute('hidden', 'true');

  
    for (let i = 0; i < files.length; i++) {
      if (this.file_counter == 0) {
        this.formData.append('file'+this.file_counter, files[i]);
      } else {
        this.formData.append('file'+this.counter, files[i]);
      }
      
    }
  }

  send(): void {
    this.wait = true;
    this.formData.append('name', this.name.value);
    this.formData.append('section', this.section.value);
    this.formData.append('short', this.short.value);
    this.formData.append('full', this.full.value);
    this.formData.append('needed', this.needed.value);
    this.formData.append('tags', this.tags.toString());
    this.formData.append('numSteps', ''+this.counter);
    this.formData.append('author', localStorage.getItem('currentUser'));
    this.formData.append('videoLink', this.videoLink.value);
  
    for (let a = 0; a < this.counter; a++)
    {
      let node = <HTMLInputElement>(document.getElementById('form10'))
      if (node) { 
        this.formData.append('stepDesc'+(a+1), node.value); 
        document.getElementById('form10').setAttribute('id','form1');
      }
    }

    for (let a = 0; a < this.counter; a++)
    {
      let node = <HTMLInputElement>(document.getElementById('form-step-name'))
      if (node){
        this.formData.append('stepName'+(a+1), node.value);
        document.getElementById('form-step-name').setAttribute('id','form1');
      }
      
    }
    
  
    this.httpService.uploadPost(this.formData).subscribe((data: Response)=> {
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
