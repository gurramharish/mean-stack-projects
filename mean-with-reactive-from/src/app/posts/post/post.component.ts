import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Post } from './post.model';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  @Input('post') post: Post;
  @Output('deletePost') deletePost = new EventEmitter<string>();

  constructor(public postsService: PostsService) { }

  ngOnInit() {
  }

  onDelete(postId: string) {
    this.deletePost.emit(postId);
  }

}
