import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Photo } from 'src/app/interfaces/photos/photo';
import { PhotosService } from 'src/app/services/photos/photos.service';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.css']
})
export class PhotosComponent implements OnInit {
  photo !: Photo;
  constructor(private router: ActivatedRoute, private photoService: PhotosService) { }

  ngOnInit(): void {
    const photoId = this.router.snapshot.params['id'];
    this.photoService.getPhotoById(photoId).subscribe((data) => {
      this.photo = data;
    });
  }

}
