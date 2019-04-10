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

const routes: Routes = [
  { path: 'signup', component: RegistrationFormComponent },
  { path: 'signin', component: AuthorizationFormComponent },
  { path: 'users', component: UserListComponent },
  { path: 'main', component: MainComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'editor/:id', component: EditorComponent },
  { path: 'instructions', component: PostListComponent },
  { path: 'user/:login', component: UserComponent },
  { path: 'search', component: SearchComponent },
  { path: '', redirectTo: '/main', pathMatch: 'full' },
  { path: 'post/:id', component: PostComponent },
  { path: 'category/:category', component: CategoryComponent },
  { path: 'search/:tag', component: SearchTagComponent },
  { path: 'constructor', component: ConstructorComponent }
];

@NgModule({
  exports: [ RouterModule ],
  imports: [ RouterModule.forRoot(routes) ],
  declarations: []
})
export class AppRoutingModule { }
