import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Album } from 'src/app/interfaces/albums/album';
import Action from 'src/app/interfaces/common/actionStatus';
import { Pagination } from 'src/app/interfaces/common/pagination';
import { Post } from 'src/app/interfaces/posts/post';
import User from 'src/app/interfaces/users/user';
import { AlbumsService } from 'src/app/services/albums/albums.service';
import { PostsService } from 'src/app/services/posts/posts.service';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.scss']
})
export class ProfilesComponent implements OnInit{
  userId: string = ""
  user:User|null = null

  albums: Album[] = []
  albumShows: Album[] = []
  albumsPagination: Pagination = {
    currentPage: 1,
    totalPage: 1,
    pagesToShow: 5
  }

  posts: Post[] = []
  post!: Post
  postShows: Post[] = []
  postsPagination: Pagination = {
    currentPage: 1,
    totalPage: 1,
    pagesToShow: 5
  }
  actionStatus: Action = Action.CREATE;

  constructor(
    private route: ActivatedRoute, 
    private userService: UsersService,
    private albumsService: AlbumsService,
    private postsService: PostsService
  ) { }

  openModal(){
    this.userId = this.route.snapshot.params['id'];
    this.actionStatus = Action.CREATE;
  }

  albumPaging(pageNumber: number){
    this.albumsPagination.currentPage = pageNumber;
    this.albumShows = this.albums.slice(
      (pageNumber - 1) * this.albumsPagination.pagesToShow, pageNumber * this.albumsPagination.pagesToShow
    )
  }

  postPaging(pageNumber: number){
    this.postsPagination.currentPage = pageNumber;
    this.postShows = this.posts.slice(
      (pageNumber - 1) * this.postsPagination.pagesToShow, pageNumber * this.postsPagination.pagesToShow
    )
  }

  createPost(post: Post){
    this.posts.push(post)
    this.postsPagination = {
      currentPage: 1,
      totalPage: Math.ceil(this.posts.length / 5),
      pagesToShow: 5
    }
  }

  editPost(post: Post){
    this.post = post;
    this.actionStatus = Action.UPDATE;
  }

  deletePost(postId: number){
    this.postsService.deletePost(postId).subscribe((data) => {
      this.posts = this.posts.filter((p) => p.id !== postId);
    });
  }

  updatePost(post: Post){
    this.posts = this.posts.map((p) => {
      if(p.id === post.id){
        return post;
      }
      return p;
    });
  }

  ngOnInit(): void {
    this.userId = this.route.snapshot.params['id'];

    this.userService.getUserById(this.userId).subscribe((data) => {
      this.user = data;
    });

    this.albumsService.getAlbumsByUserId(this.userId).subscribe((data) => {
      this.albums = data;
      this.albumsPagination = {
        currentPage: 1,
        totalPage: Math.ceil(data.length / 5),
        pagesToShow: 5
      }
      this.albumPaging(1);
    }); 

    this.postsService.getPostsByUserId(this.userId).subscribe((data) => { 
      this.posts = data;
      this.postsPagination = {
        currentPage: 1,
        totalPage: Math.ceil(data.length / 5),
        pagesToShow: 5
      }
      this.postPaging(1);
    });
  }

}
