import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from '../models/post';
import { Comment } from '../models/comment';


@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient) { }

  private baseUrl = 'https://jsonplaceholder.typicode.com';

  getPosts() {
    return this.http.get<Post[]>(this.baseUrl + '/posts');
  }

  getComments(postId: number) {
    return this.http.get<Comment[]>(this.baseUrl + '/comments?postId=' + postId);
  }
}
