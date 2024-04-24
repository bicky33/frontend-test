import { Component, OnInit } from '@angular/core';
import { Album } from 'src/app/interfaces/albums/album';
import User from 'src/app/interfaces/users/user';
import { AlbumsService } from 'src/app/services/albums/albums.service';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-albums-dashboard',
  templateUrl: './albums-dashboard.component.html',
  styleUrls: ['./albums-dashboard.component.css']
})
export class AlbumsDashboardComponent implements OnInit {

  albums : Album[] = []
  albumShows: Album[] = []
  albumsPagination = {
    currentPage: 1,
    totalPage: 1,
    pagesToShow: 10
  }

  users: User[] = []
  userMaps = new Map<number, string>()
  constructor(
    private albumsService: AlbumsService,
    private usersService: UsersService
  ) { }

  albumPaging(pageNumber: number){
    this.albumsPagination.currentPage = pageNumber;
    this.albumShows = this.albums.slice(
      (pageNumber - 1) * this.albumsPagination.pagesToShow, pageNumber * this.albumsPagination.pagesToShow
    )
  }

  ngOnInit(): void {
    this.albumsService.getAlbums().subscribe((data) => {
      this.albums = data;
      this.albumsPagination.totalPage = Math.ceil(this.albums.length / this.albumsPagination.pagesToShow);
      this.albumPaging(1);
    });

    this.usersService.getUsers().subscribe((data: User[]) => {
      this.users = data;
      this.userMaps = new Map<number, string>(data.map((user) => [user.id, user.username]));
    });

  }

}
