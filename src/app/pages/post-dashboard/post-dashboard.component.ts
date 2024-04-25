import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/interfaces/posts/post';
import User from 'src/app/interfaces/users/user';
import { PostsService } from 'src/app/services/posts/posts.service';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-post-dashboard',
  templateUrl: './post-dashboard.component.html',
  styleUrls: ['./post-dashboard.component.css']
})
export class PostDashboardComponent implements OnInit{

  posts: Post[] = []
  postShows: Post[] = []
  users: User[] = []
  userMaps = new Map<number, string>()

  constructor(
    private postService: PostsService,
    private userService: UsersService
  ) { }

  onLoadMore(){
    this.postShows = [...this.postShows, ...this.posts.slice(this.postShows.length, this.postShows.length + 5)]
  }

  ngOnInit(): void {
    this.postService.getPosts().subscribe((data) => {
      this.posts = data;
      this.postShows = this.posts.slice(0, 5);
      this.userService.getUsers().subscribe((data: User[]) => {
        this.users = data;
        this.userMaps = new Map<number, string>(data.map((user) => [user.id, user.username]));
      })
    })
  }

}
