import { Component, EventEmitter, Output } from '@angular/core';
import { Post } from '../post/post.model';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent {
   enteredContent = '';
   enteredTitle = '';
   @Output('postCreated') postCreated = new EventEmitter<Post>();

  constructor() {

  }
  onAddPost() {
    const post = {title: this.enteredTitle, content: this.enteredContent};
    this.enteredContent = '';
    this.enteredTitle = '';
    this.postCreated.emit(post);
  }
}
