import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { HttpService } from '../http.service';
import { MessageService } from 'primeng/api';
import { Response } from '../response';
import { LocalizationService } from '../localization.service';
import { Localization } from '../localization';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss'],
  providers: [MessageService]
})
export class RegistrationFormComponent implements OnInit {
  ui: Localization;
  login = new FormControl(null, [Validators.required, Validators.pattern('[A-Za-z0-9]*')]);
  email = new FormControl('', [Validators.required, Validators.email] );
  name = new FormControl('', [Validators.required, Validators.pattern('[A-Za-zА-Яа-я \']*')] );
  age = new FormControl('', [Validators.required, Validators.pattern('[0-9]*')] );
  location = new FormControl('', [Validators.required, Validators.pattern('[A-Za-zА-Яа-я, ]*')] );
  confirmPassword = new FormControl('', [Validators.required, Validators.minLength(6)] );
  password = new FormControl('', [Validators.required, Validators.minLength(6)] );
  formData: FormData = new FormData();
  fileLoaded: boolean;
  wait: boolean;
  
  constructor(
    private httpService: HttpService,
    private messageService: MessageService,
    private localizationService: LocalizationService
  ) { }

  ngOnInit() {
    this.localizationService.subject.subscribe( ui => {
      this.ui = ui;
    });
    this.ui = this.localizationService.ui;
    document.getElementById('form-login').focus();
    this.wait = false;
  }

  onFileUpload(event): void {
    this.fileLoaded = true;
    const eventObj: MSInputMethodContext = <MSInputMethodContext>event;
    const target: HTMLInputElement = <HTMLInputElement>eventObj.target;
    const files: FileList = target.files;

  
    for (let i = 0; i < files.length; i++) {
      this.formData.append('file', files[i]);
    }
  }
  send() : void {
    if (this.confirmPassword.value == this.password.value) 
    {
      this.wait = true;
      this.formData.append('login', this.login.value);
      this.formData.append('email', this.email.value);
      this.formData.append('name', this.name.value);
      this.formData.append('location', this.location.value);
      this.formData.append('age', this.age.value);
      this.formData.append('password', this.password.value);
      this.formData.append('confirm_password', this.confirmPassword.value);
      this.httpService.register(this.formData).subscribe((data: Response)=> {
        if (data.error == "") {
          this.messageService.add({severity:'success', summary:'Succes', detail:data.success});
        } else {
          this.messageService.add({severity:'error', summary:'Error', detail:data.error});
        }
        if (data) {this.wait = false;}
        
      });
    } else {
      this.messageService.add({severity:'error', summary:'Error', detail: this.ui.passwordsMissmatch});
    } 
  }

}
