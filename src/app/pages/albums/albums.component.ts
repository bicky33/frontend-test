import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Album } from 'src/app/interfaces/albums/album';
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
  album !: Album;
  constructor(
    private photoService:  PhotosService, 
    private route: ActivatedRoute, 
    private albumsService: AlbumsService
  ) { 
    const albumId = this.route.snapshot.params['id'];

    this.photoService.getPhotosByAlbumId(albumId).subscribe((data) => {
      this.photos = data;
    });

    this.albumsService.getAlbumById(albumId).subscribe((data) => {
      this.album = data;
    });
  }

  ngOnInit(): void {
  }

}
