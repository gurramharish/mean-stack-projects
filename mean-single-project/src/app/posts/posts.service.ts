import { Injectable } from '../../../node_modules/@angular/core';
import { Post } from './post/post.model';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

const BACK_END_URL = `${environment.apiUrl}/posts`;

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private posts: Post[] = [];
  private postsSubject = new Subject<{posts: Post[], postCount: number}>();

  constructor(private http: HttpClient, private router: Router) {}

  getPosts(postsPerPage: number, currentPage: number) {
    const queryParams = `?pageSize=${postsPerPage}&page=${currentPage}`;
    this.http.get<{message: string, posts: any, count: number}>(`${BACK_END_URL}${queryParams}`)
    .pipe(map(postData => {
      return {
        postCount: postData.count,
        posts: postData.posts.map(post => {
          return {
            id: post._id,
            ...post
          };
        })
      };
    }))
    .subscribe(transformedPosts => {
      this.posts = transformedPosts.posts;
      this.postsSubject.next(transformedPosts);
    });
  }

  getUpdatedPosts() {
    return this.postsSubject.asObservable();
  }

  addPost(title: string, content: string, image: File) {
    const post = {id: null, title, content, imagePath: null};
    const postData = new FormData();
    postData.append('title', title);
    postData.append('content', content);
    postData.append('image', image, title);
    this.http.post<{message: string, post: Post}>(BACK_END_URL, postData)
    .subscribe(responseData => {
      this.router.navigate(['/']);
    });
  }

  getPost(postId: string) {
    return this.http.get<{_id: string,
      title: string, content: string,
      imagePath: string, creator: string}>(`${BACK_END_URL}/${postId}`);
  }

  updatePost(postId: string, title: string, content: string) {
    const post = {
      id: postId,
      title,
      content
    };
    this.http.put<{message: string}>(`${BACK_END_URL}/${postId}`, post)
    .subscribe((responseData) => {
      console.log(responseData.message);
      this.router.navigate(['/']);
    });
  }

  deletePost(postId: string) {
    return this.http.delete(`${BACK_END_URL}/${postId}`);
  }
}

