import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditablePostsComponent } from './editable-posts.component';

describe('EditablePostsComponent', () => {
  let component: EditablePostsComponent;
  let fixture: ComponentFixture<EditablePostsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditablePostsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditablePostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
