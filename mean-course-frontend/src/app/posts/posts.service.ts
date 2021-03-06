import { Injectable } from '../../../node_modules/@angular/core';
import { Post } from './post/post.model';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '../../../node_modules/@angular/common/http';
import { Router } from '../../../node_modules/@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private posts: Post[] = [];
  private postsSubject = new Subject<Post[]>();

  constructor(private http: HttpClient, private router: Router) {}

  getPosts() {
    this.http.get<{message: string, posts: any}>('http://localhost:3000/api/posts')
    .pipe(map(postData => {
      return postData.posts.map(post => {
        return {
          id: post._id,
          title: post.title,
          content: post.content
        };
      });
    }))
    .subscribe(transformedPosts => {
      this.posts = transformedPosts;
      this.postsSubject.next([...this.posts]);
    });
  }

  getUpdatedPosts() {
    return this.postsSubject.asObservable();
  }

  addPost(title: string, content: string) {
    const post = {id: null, title, content};
    this.http.post<{message: string, id: string}>('http://localhost:3000/api/posts', post)
    .subscribe(responseData => {
      console.log(responseData.message);
      post.id = responseData.id;
      this.posts = [post, ...this.posts];
      this.postsSubject.next([...this.posts]);
      this.router.navigate(['/']);
    });
  }

  getPost(postId: string) {
    return this.http.get<{_id: string, title: string, content: string}>(`http://localhost:3000/api/posts/${postId}`);
  }

  updatePost(postId: string, title: string, content: string) {
    const post = {
      id: postId,
      title,
      content
    };
    this.http.put<{message: string}>(`http://localhost:3000/api/posts/${postId}`, post)
    .subscribe((responseData) => {
      console.log(responseData.message);
      this.router.navigate(['/']);
    });
  }

  deletePost(postId: string) {
    this.http.delete(`http://localhost:3000/api/posts/${postId}`)
    .subscribe(() => {
      const updatedPosts = this.posts.filter(post => post.id !== postId);
      this.posts = updatedPosts;
      this.postsSubject.next([...updatedPosts]);
    });
  }
}

