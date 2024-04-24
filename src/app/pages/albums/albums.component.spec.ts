import { ComponentFixture, TestBed } from '@angular/core/testing'
import { ActivatedRoute } from '@angular/router'
import { AlbumsComponent } from './albums.component'
import { AlbumsService } from 'src/app/services/albums/albums.service'
import { PhotosService } from 'src/app/services/photos/photos.service'
import { of } from 'rxjs'
import { Photo } from 'src/app/interfaces/photos/photo'
import { Album } from 'src/app/interfaces/albums/album'

describe('AlbumsComponent', () => {
  let component: AlbumsComponent
  let fixture: ComponentFixture<AlbumsComponent>
  let mockPhotosService: jasmine.SpyObj<PhotosService>
  let mockAlbumsService: jasmine.SpyObj<AlbumsService>
  let mockActivatedRoute: jasmine.SpyObj<ActivatedRoute>

  beforeEach(() => {
    mockPhotosService = jasmine.createSpyObj('PhotosService', ['getPhotos'])
    mockAlbumsService = jasmine.createSpyObj('AlbumsService', ['getAlbum'])
    mockActivatedRoute = jasmine.createSpyObj('ActivatedRoute', [], { snapshot: { paramMap: { get: () => '1' } } })

    TestBed.configureTestingModule({
      declarations: [AlbumsComponent],
      providers: [
        { provide: PhotosService, useValue: mockPhotosService },
        { provide: AlbumsService, useValue: mockAlbumsService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ]
    }).compileComponents()

    fixture = TestBed.createComponent(AlbumsComponent)
    component = fixture.componentInstance
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should fetch photos and album on initialization', () => {
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
    const mockAlbum: Album = { id: 1, title: 'Album 1', userId: 1 }

    mockPhotosService.getPhotos.and.returnValue(of(mockPhotos))
    mockAlbumsService.getAlbum.and.returnValue(of(mockAlbum))

    component.ngOnInit()

    expect(mockPhotosService.getPhotos).toHaveBeenCalled()
    expect(mockAlbumsService.getAlbum).toHaveBeenCalledWith(1)
    expect(component.photos).toEqual(mockPhotos)
    expect(component.album).toEqual(mockAlbum)
  })

  it('should update photos pagination when calling photoPaging', () => {
    const pageNumber = 2

    component.photoPaging(pageNumber)

    expect(component.photosPagination.currentPage).toEqual(pageNumber)
  })
})
