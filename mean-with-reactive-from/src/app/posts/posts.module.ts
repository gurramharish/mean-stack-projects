import { NgModule } from '@angular/core';
import { PostListComponent } from './post-list/post-list.component';
import { PostComponent } from './post/post.component';
import { PostCreateComponent } from './post-create/post-create.component';
import { ReactiveFormsModule } from '../../../node_modules/@angular/forms';
import { CommonModule } from '../../../node_modules/@angular/common';
import { RouterModule } from '../../../node_modules/@angular/router';
import { AngularMaterialModule } from '../angular-material.module';

@NgModule({
  declarations: [
    PostListComponent,
    PostComponent,
    PostCreateComponent
  ],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterModule,
    AngularMaterialModule
  ]
})
export class PostsModule {}
