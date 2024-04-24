import { TestBed } from '@angular/core/testing'
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'

import { AlbumsService } from './albums.service'
import { environment } from 'src/environments/environment.development'

describe('AlbumsService', () => {
  let service: AlbumsService
  let httpMock: HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AlbumsService]
    })
    service = TestBed.inject(AlbumsService)
    httpMock = TestBed.inject(HttpTestingController)
  })

  afterEach(() => {
    httpMock.verify()
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  it('should retrieve albums by user ID', () => {
    const userId = '123'
    const mockAlbums = [
      {
        "userId": 1,
        "id": 1,
        "title": "quidem molestiae enim"
      },
      {
        "userId": 1,
        "id": 2,
        "title": "sunt qui excepturi placeat culpa"
      },
    ]

    service.getAlbumsByUserId(userId).subscribe(albums => {
      expect(albums).toEqual(mockAlbums)
    })

    const req = httpMock.expectOne(`${environment.baseUrl}/albums?userId=${userId}`)
    expect(req.request.method).toBe('GET')
    req.flush(mockAlbums)
  })

  it('should retrieve all albums', () => {
    const mockAlbums = [
      {
        "userId": 1,
        "id": 1,
        "title": "quidem molestiae enim"
      },
      {
        "userId": 1,
        "id": 2,
        "title": "sunt qui excepturi placeat culpa"
      },
    ]
    service.getAlbums().subscribe(albums => {
      expect(albums).toEqual(mockAlbums)
    })

    const req = httpMock.expectOne(`${environment.baseUrl}/albums`)
    expect(req.request.method).toBe('GET')
    req.flush(mockAlbums)
  })

  it('should retrieve an album by ID', () => {
    const albumId = 1
    const mockAlbum = { id: 1, title: 'Album 1', userId: 1}

    service.getAlbum(albumId).subscribe(album => {
      expect(album).toEqual(mockAlbum)
    })

    const req = httpMock.expectOne(`${environment.baseUrl}/albums/${albumId}`)
    expect(req.request.method).toBe('GET')
    req.flush(mockAlbum)
  })

  it('should retrieve an album by album ID', () => {
    const albumId = 'abc'
    const mockAlbum = { id: 1, title: 'Album 1', userId: 1 }

    service.getAlbumById(albumId).subscribe(album => {
      expect(album).toEqual(mockAlbum)
    })

    const req = httpMock.expectOne(`${environment.baseUrl}/albums?id=${albumId}`)
    expect(req.request.method).toBe('GET')
    req.flush(mockAlbum)
  })
})
