import { Component, OnInit, OnDestroy } from '@angular/core';
import { Post } from '../post/post.model';
import { PostsService } from '../posts.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {

  posts: Post[] = [];
  postsSubscription: Subscription;
  isLoading = false;

  constructor(public postsService: PostsService) { }

  ngOnInit() {
    this.postsService.getPosts();
    this.isLoading = true;
    this.postsSubscription = this.postsService.getUpdatedPosts()
                                            .subscribe((posts: Post[]) => {
                                              this.posts = posts;
                                              this.isLoading = false;
                                            });
  }

  ngOnDestroy() {
    this.postsSubscription.unsubscribe();
  }

}
