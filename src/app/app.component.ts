import { Component } from '@angular/core';
import { Post } from './models/post';
import { Comment } from './models/comment';
import { AppService } from './services/app.service';
import { mergeMap, map } from 'rxjs/operators';
import { Observable, combineLatest } from 'rxjs';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { NestedTreeControl } from '@angular/cdk/tree';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  posts: Post[] = [];
  comments: Comment[] = [];

  treeControl = new NestedTreeControl<Post>(node => node.comments);
  dataSource = new MatTreeNestedDataSource<Post>();

  constructor(private appService: AppService) {
    this.getPosts();
  }

  getPosts() {

    this.appService.getPosts().pipe(
      mergeMap((posts: Post[]) => {
        const commentsRequestArray: Observable<Post>[] =
          posts.map(post => {
            return this.appService.getComments(post.id).pipe(
              map(comments => {
                post.comments = comments;
                return post;
              }));
          });
        return combineLatest(commentsRequestArray);
      })
    ).subscribe(data => {
      console.log(data);
      this.posts = data;
      this.dataSource.data = this.posts;
    });
  }

  hasChild = (_: number, node: Post) => !!node.comments && node.comments.length > 0;

  getComments(postId: number) {
    this.appService.getComments(postId).subscribe(data => this.comments = data);
  }
}
