import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostsHorizontalComponent } from './posts-horizontal.component';

describe('PostsHorizontalComponent', () => {
  let component: PostsHorizontalComponent;
  let fixture: ComponentFixture<PostsHorizontalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostsHorizontalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostsHorizontalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
