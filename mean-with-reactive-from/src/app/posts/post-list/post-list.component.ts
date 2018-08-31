import { Component, OnInit, OnDestroy } from '@angular/core';
import { PageEvent } from '@angular/material';
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
  totalPosts = 10;
  postsPerPage = 2;
  currentPage = 1;
  pageSizeOptions = [2, 5, 10];

  constructor(public postsService: PostsService) { }

  ngOnInit() {
    this.postsService.getPosts(this.postsPerPage, 1);
    this.isLoading = true;
    this.postsSubscription = this.postsService.getUpdatedPosts()
                                            .subscribe((data: {posts: Post[], postCount: number}) => {
                                              this.posts = data.posts;
                                              this.isLoading = false;
                                              this.totalPosts = data.postCount;
                                            });
  }

  ngOnDestroy() {
    this.postsSubscription.unsubscribe();
  }

  onPageChangedEvent(pageEvent: PageEvent) {
    this.isLoading = true;
    this.postsPerPage = pageEvent.pageSize;
    this.currentPage = pageEvent.pageIndex + 1;
    this.postsService.getPosts(this.postsPerPage, this.currentPage);
  }

  onDeletePost(postId: string) {
    this.isLoading = true;
    this.postsService.deletePost(postId)
    .subscribe(() => {
      this.postsService.getPosts(this.postsPerPage, this.currentPage);
    });
  }
}
