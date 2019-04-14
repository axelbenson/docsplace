import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationFormComponent }      from './registration-form/registration-form.component';
import { AuthorizationFormComponent }      from './authorization-form/authorization-form.component';
import { UserListComponent }      from './user-list/user-list.component';
import { MainComponent }      from './main/main.component';
import { PostListComponent }      from './post-list/post-list.component';
import { UserComponent }  from './user/user.component';
import { PostComponent }  from './post/post.component';
import { EditorComponent }  from './editor/editor.component';
import { ConstructorComponent }  from './constructor/constructor.component';
import { AdminComponent }  from './admin/admin.component';
import { CategoryComponent }  from './category/category.component';
import { SearchComponent }  from './search/search.component';
import { SearchTagComponent }  from './search-tag/search-tag.component';
import { ProtectorService }  from './protector.service';

const routes: Routes = [
  { path: 'signup', component: RegistrationFormComponent },
  { path: 'signin', component: AuthorizationFormComponent },
  { path: 'users', component: UserListComponent, canActivate: [ProtectorService] },
  { path: 'main', component: MainComponent, canActivate: [ProtectorService] },
  { path: 'admin', component: AdminComponent, canActivate: [ProtectorService] },
  { path: 'editor/:id', component: EditorComponent, canActivate: [ProtectorService] },
  { path: 'instructions', component: PostListComponent, canActivate: [ProtectorService] },
  { path: 'user/:login', component: UserComponent, canActivate: [ProtectorService] },
  { path: 'search', component: SearchComponent, canActivate: [ProtectorService] },
  { path: '', redirectTo: '/main', pathMatch: 'full' },
  { path: 'post/:id', component: PostComponent, canActivate: [ProtectorService] },
  { path: 'category/:category', component: CategoryComponent, canActivate: [ProtectorService] },
  { path: 'search/:tag', component: SearchTagComponent, canActivate: [ProtectorService] },
  { path: 'constructor', component: ConstructorComponent, canActivate: [ProtectorService] }
];

@NgModule({
  exports: [ RouterModule ],
  imports: [ RouterModule.forRoot(routes) ],
  declarations: []
})
export class AppRoutingModule { }
