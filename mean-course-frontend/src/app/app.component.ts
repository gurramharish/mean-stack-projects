import { Component } from '@angular/core';
import { Post } from './posts/post/post.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'mean-course-frontend';
  posts = [];

  onPostAdded(post: Post) {
    this.posts = [post, ...this.posts];
  }
}
