import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Album } from 'src/app/interfaces/albums/album';
import { Pagination } from 'src/app/interfaces/common/pagination';
import { Photo } from 'src/app/interfaces/photos/photo';
import { AlbumsService } from 'src/app/services/albums/albums.service';
import { PhotosService } from 'src/app/services/photos/photos.service';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.css']
})

export class AlbumsComponent implements OnInit{
  photos: Photo[] = [];
  photoShows: Photo[] = [];
  photosPagination: Pagination = {
    currentPage: 1,
    totalPage: 1,
    pagesToShow: 8
  }
  album !: Album;
  constructor(
    private photoService:  PhotosService, 
    private route: ActivatedRoute, 
    private albumsService: AlbumsService
  ) { 
    const albumId = this.route.snapshot.params['id'];

    this.photoService.getPhotosByAlbumId(albumId).subscribe((data) => {
      this.photos = data;
      this.photosPagination.totalPage = Math.ceil(this.photos.length / this.photosPagination.pagesToShow);
      this.photoPaging(1);
    });

    this.albumsService.getAlbumById(albumId).subscribe((data) => {
      this.album = data;
    });
  }

  photoPaging(pageNumber: number){
    this.photosPagination.currentPage = pageNumber;
    this.photoShows = this.photos.slice(
      (pageNumber - 1) * this.photosPagination.pagesToShow, pageNumber * this.photosPagination.pagesToShow
    )
  }

  ngOnInit(): void {
  }

}
