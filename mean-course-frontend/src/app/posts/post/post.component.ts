import { Component, OnInit, Input } from '@angular/core';
import { Post } from './post.model';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  @Input('post') post: Post;

  constructor(public postsService: PostsService) { }

  ngOnInit() {
  }

  onDelete(postId: string) {
    this.postsService.deletePost(postId);
  }

}
