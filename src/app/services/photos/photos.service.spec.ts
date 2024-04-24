import { TestBed } from '@angular/core/testing'
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'

import { PhotosService } from './photos.service'
import { Photo } from 'src/app/interfaces/photos/photo'
import { environment } from 'src/environments/environment.development'

describe('PhotosService', () => {
  let service: PhotosService
  let httpMock: HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PhotosService]
    })
    service = TestBed.inject(PhotosService)
    httpMock = TestBed.inject(HttpTestingController)
  })

  afterEach(() => {
    httpMock.verify()
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  it('should retrieve photos', () => {
    const mockPhotos: Photo[] = [
      {
        "albumId": 1,
        "id": 1,
        "title": "accusamus beatae ad facilis cum similique qui sunt",
        "url": "https://via.placeholder.com/600/92c952",
        "thumbnailUrl": "https://via.placeholder.com/150/92c952"
      },
      {
        "albumId": 1,
        "id": 2,
        "title": "reprehenderit est deserunt velit ipsam",
        "url": "https://via.placeholder.com/600/771796",
        "thumbnailUrl": "https://via.placeholder.com/150/771796"
      },
    ]

    service.getPhotos().subscribe((photos: Photo[]) => {
      expect(photos).toEqual(mockPhotos)
    })

    const req = httpMock.expectOne(`${environment.baseUrl}/photos`)
    expect(req.request.method).toBe('GET')
    req.flush(mockPhotos)
  })

  it('should retrieve photos by album ID', () => {
    const albumId = '1'
    const mockPhotos: Photo[] = [
      {
        "albumId": 1,
        "id": 1,
        "title": "accusamus beatae ad facilis cum similique qui sunt",
        "url": "https://via.placeholder.com/600/92c952",
        "thumbnailUrl": "https://via.placeholder.com/150/92c952"
      },
      {
        "albumId": 1,
        "id": 2,
        "title": "reprehenderit est deserunt velit ipsam",
        "url": "https://via.placeholder.com/600/771796",
        "thumbnailUrl": "https://via.placeholder.com/150/771796"
      },
    ]

    service.getPhotosByAlbumId(albumId).subscribe((photos: Photo[]) => {
      expect(photos).toEqual(mockPhotos)
    })

    const req = httpMock.expectOne(`${environment.baseUrl}/photos?albumId=${albumId}`)
    expect(req.request.method).toBe('GET')
    req.flush(mockPhotos)
  })

  it('should retrieve a photo by ID', () => {
    const photoId = '1'
    const mockPhoto: Photo = {
      "albumId": 1,
      "id": 1,
      "title": "accusamus beatae ad facilis cum similique qui sunt",
      "url": "https://via.placeholder.com/600/92c952",
      "thumbnailUrl": "https://via.placeholder.com/150/92c952"
    }

    service.getPhotoById(photoId).subscribe((photo: Photo) => {
      expect(photo).toEqual(mockPhoto)
    })

    const req = httpMock.expectOne(`${environment.baseUrl}/photos/${photoId}`)
    expect(req.request.method).toBe('GET')
    req.flush(mockPhoto)
  })
})
