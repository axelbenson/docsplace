import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { HttpClientModule }    from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { AuthorizationFormComponent } from './authorization-form/authorization-form.component';
import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { RecentPostsComponent } from './recent-posts/recent-posts.component';
import { UserListComponent } from './user-list/user-list.component';
import { MainComponent } from './main/main.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PostsComponent } from './posts/posts.component';
import { TopPostsComponent } from './top-posts/top-posts.component';
import { TopUsersComponent } from './top-users/top-users.component';
import { PostListComponent } from './post-list/post-list.component';
import { UserComponent } from './user/user.component';
import { MessageService } from 'primeng/api';
import { SharedService } from './shared.service';
import {GrowlModule} from 'primeng/growl';
import {ToastModule} from 'primeng/toast';
import {ProgressBarModule} from 'primeng/progressbar';
import {FileUploadModule} from 'primeng/fileupload';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import { PostComponent } from './post/post.component';
import {Ng2PageScrollModule} from 'ng2-page-scroll';
import {MatStepperModule} from '@angular/material';
import {MatExpansionModule} from '@angular/material';
import { MatButtonModule } from '@angular/material/button';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import { ConstructorComponent } from './constructor/constructor.component';
import {MatSelectModule} from '@angular/material/select';
import {MatChipInputEvent} from '@angular/material';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipsModule} from '@angular/material/chips';
import {MatFormFieldModule} from '@angular/material/form-field';
import { InputsModule, WavesModule, ButtonsModule, CardsFreeModule} from 'angular-bootstrap-md';
import { CommentsGroupComponent } from './post/comments-group/comments-group.component';
import { EditorComponent } from './editor/editor.component';
import { EditablePostsComponent } from './editable-posts/editable-posts.component';
import { AdminComponent } from './admin/admin.component';
import {MatTableModule} from '@angular/material/table';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSortModule} from '@angular/material/sort';
import { CategoryComponent } from './category/category.component';
import { SearchComponent } from './search/search.component';
import { TagCloudModule } from 'angular-tag-cloud-module';
import { MyTagCloudComponent } from './tag-cloud/tag-cloud.component';
import { SearchTagComponent } from './search-tag/search-tag.component';
import { MedalsComponent } from './medals/medals.component';
import { FooterComponent } from './footer/footer.component';
import {InputSwitchModule} from 'primeng/inputswitch';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    AuthorizationFormComponent,
    RegistrationFormComponent,
    RecentPostsComponent,
    UserListComponent,
    MainComponent,
    NavbarComponent,
    PostsComponent,
    TopPostsComponent,
    TopUsersComponent,
    PostListComponent,
    UserComponent,
    PostComponent,
    ConstructorComponent,
    CommentsGroupComponent,
    EditorComponent,
    EditablePostsComponent,
    AdminComponent,
    CategoryComponent,
    SearchComponent,
    MyTagCloudComponent,
    SearchTagComponent,
    MedalsComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MDBBootstrapModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    GrowlModule,
    ToastModule,
    ProgressBarModule,
    FileUploadModule,
    ProgressSpinnerModule,
    Ng2PageScrollModule,
    MatStepperModule,
    MatButtonModule,
    MatExpansionModule,
    NoopAnimationsModule,
    MatSelectModule,
    MatChipsModule,
    MatFormFieldModule,
    InputsModule, 
    WavesModule, 
    ButtonsModule,
    MatTableModule,
    MatCheckboxModule,
    MatSortModule,
    TagCloudModule,
    InputSwitchModule,
    FormsModule,
    CardsFreeModule
  ],
  schemas: [ NO_ERRORS_SCHEMA ],
  providers: [
    MessageService, 
    SharedService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
