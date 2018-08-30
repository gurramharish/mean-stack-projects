import { Injectable } from '../../../node_modules/@angular/core';
import { Post } from './post/post.model';
import { Subject } from 'rxjs';
import { HttpClient } from '../../../node_modules/@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private posts: Post[] = [];
  private postsSubject = new Subject<Post[]>();

  constructor(private http: HttpClient) {}

  getPosts() {
    this.http.get<{message: string, posts: Post[]}>('http://localhost:3000/api/posts')
    .subscribe((postsData) => {
      this.posts = postsData.posts;
      this.postsSubject.next([...this.posts]);
    });
  }

  getUpdatedPosts() {
    return this.postsSubject.asObservable();
  }

  addPost(title: string, content: string) {
    const post = {id: '', title, content};
    this.http.post<{message: string}>('http://localhost:3000/api/posts', post)
    .subscribe(responseData => {
      this.posts = [post, ...this.posts];
      this.postsSubject.next([...this.posts]);
    });
  }
}
