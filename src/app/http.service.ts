import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CloudData } from 'angular-tag-cloud-module';
import { Observable } from 'rxjs';
import { PostCard } from './post-card';
import { UserCard } from './user-card';
import { UserProfile } from './user-profile';
import { Step } from './step';
import { Comment } from './comment';
import { Localization } from './localization';


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  api = 'http://docsplace-server.ru/server_api.php';
  formData: FormData = new FormData();

  constructor(private http: HttpClient) { }

  search(request): Observable<PostCard[]> {
    this.formData = new FormData;
    this.formData.append('request', request);
    return this.http.post<PostCard[]>(this.api + "?request=search", this.formData)
  }

  getTags(): Observable<CloudData[]> {
    return this.http.get<CloudData[]>(this.api + "?request=getTags")
  }

  getComments(postId, login): Observable<Comment[]> {
    return this.http.get<Comment[]>(this.api + "?request=getComments" +"&postId="+postId+'&login='+login)
  }

  getSteps(postId,numSteps): Observable<Step[]> {
    return this.http.get<Step[]>(this.api + "?request=getSteps" + '&postId='+postId+'&numSteps='+numSteps)
  }

  getPost(id): Observable<PostCard> {
    return this.http.get<PostCard>(this.api + "?request=getPost" + '&id='+id)
  }

  getPostCardsByTag(tag): Observable<PostCard[]> {
    return this.http.get<PostCard[]>(this.api + "?request=getPostCardsByTag" + '&tag='+tag)
  }

  getPostCards(): Observable<PostCard[]> {
    return this.http.get<PostCard[]>(this.api + "?request=getPostCards")
  }

  getCategoryCards(category): Observable<PostCard[]> {
    return this.http.get<PostCard[]>(this.api + "?request=getCategoryCards" + '&category='+category)
  }

  getRecentPostCards(): Observable<PostCard[]> {
    return this.http.get<PostCard[]>(this.api + "?request=getRecentPostCards")
  }

  getTopPostCards(): Observable<PostCard[]> {
    return this.http.get<PostCard[]>(this.api + "?request=getTopPostCards")
  }

  getUserPosts(login: string): Observable<PostCard[]> {
    return this.http.get<PostCard[]>(this.api + "?request=getUserPosts" + '&login='+login)
  }

  getUserCards(): Observable<UserCard[]> {
    return this.http.get<UserCard[]>(this.api + "?request=getUserCards")
  }

  getTopUserCards(): Observable<UserCard[]> {
    return this.http.get<UserCard[]>(this.api + "?request=getTopUserCards")
  }

  getUser(login: string): Observable<UserProfile> {
    return this.http.get<UserProfile>(this.api + "?request=getUser" + "&login="+login)
  }

  getLanguage(language): Observable<Localization> {
    return this.http.get<Localization>(this.api + "?request=getLanguage" + '&language='+ language)
  }

  authorize(login: string, password: string) {
    const body = {login: login, password: password}; 
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.post(this.api + "?request=authorize", body, httpOptions);
  }

  adminAction(formData: FormData) {
    return this.http.post(this.api + "?request=adminAction", formData);
  }

  uploadPost(formData: FormData) {
    return this.http.post(this.api + "?request=uploadPost", formData);
  }

  deletePost(formData: FormData) {
    return this.http.post(this.api + "?request=deletePost", formData);
  }

  editPost(formData: FormData) {
    return this.http.post(this.api + "?request=editPost", formData);
  }

  checkStars(id,login) {
    return this.http.get(this.api + "?request=checkStars" + '&post_id='+id+'&login='+login);
  }

  updateStars(formData: FormData) {
    return this.http.post(this.api + "?request=updateStars", formData);
  }

  updateLikes(formData: FormData) {
    return this.http.post(this.api + "?request=updateLikes", formData);
  }

  addComment(formData: FormData) {
    return this.http.post(this.api + "?request=addComment", formData);
  }

  register(formData: FormData) {
    return this.http.post(this.api + "?request=register", formData);
  }

  editUser(formData: FormData) {
    return this.http.post(this.api + "?request=editUser", formData);
  }



  
}
