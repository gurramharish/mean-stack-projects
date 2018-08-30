import { Injectable } from '../../../node_modules/@angular/core';
import { Post } from './post/post.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private posts: Post[] = [];
  private postsSubject = new Subject<Post[]>();

  getPosts() {
    return this.posts;
  }

  getUpdatedPosts() {
    return this.postsSubject.asObservable();
  }

  addPost(title: string, content: string) {
    const post = {title, content};
    this.posts = [post, ...this.posts];
    this.postsSubject.next([...this.posts]);
  }
}
