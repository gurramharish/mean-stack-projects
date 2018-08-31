import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Post } from './post.model';
import { PostsService } from '../posts.service';
import { Subscription } from '../../../../node_modules/rxjs';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit, OnDestroy {

  @Input('post') post: Post;
  @Output('deletePost') deletePost = new EventEmitter<string>();
  userAuthenticated = false;
  authSubscription: Subscription;

  constructor(public postsService: PostsService, private authService: AuthService) { }

  ngOnInit() {
    this.userAuthenticated = this.authService.isAuth();
    this.authSubscription = this.authService.getAuthStatusListener()
                            .subscribe((isAuthenticated) => {
                              this.userAuthenticated = isAuthenticated;
                            });
  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }

  onDelete(postId: string) {
    this.deletePost.emit(postId);
  }

}
