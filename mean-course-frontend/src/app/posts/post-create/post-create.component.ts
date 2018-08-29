import { Component, EventEmitter, Output } from '@angular/core';
import { Post } from '../post/post.model';
import { NgForm } from '../../../../node_modules/@angular/forms';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent {
   @Output('postCreated') postCreated = new EventEmitter<Post>();

  constructor() {

  }
  onAddPost(form: NgForm) {
    if (form.invalid) {
      return;
    }
    const post = {
                  title: form.value.title,
                  content: form.value.content
                };
    this.postCreated.emit(post);
  }
}
