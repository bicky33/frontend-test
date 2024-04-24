import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Album } from 'src/app/interfaces/albums/album';
import { Post } from 'src/app/interfaces/posts/post';
import User from 'src/app/interfaces/users/user';
import { AlbumsService } from 'src/app/services/albums/albums.service';
import { PostsService } from 'src/app/services/posts/posts.service';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.css']
})
export class ProfilesComponent implements OnInit{
  userId: string = "";
  user:User|null = null;
  albums: Album[] = [];
  posts: Post[] = [];

  constructor(
    private route: ActivatedRoute, 
    private userService: UsersService,
    private albumsService: AlbumsService,
    private postsService: PostsService
  ) { }

  ngOnInit(): void {
    this.userId = this.route.snapshot.params['id'];

    this.userService.getUserById(this.userId).subscribe((data) => {
      this.user = data;
    });

    this.albumsService.getAlbumsByUserId(this.userId).subscribe((data) => {
      this.albums = data;
    }); 

    this.postsService.getPostsByUserId(this.userId).subscribe((data) => { 
      this.posts = data;
    });
  }

}
