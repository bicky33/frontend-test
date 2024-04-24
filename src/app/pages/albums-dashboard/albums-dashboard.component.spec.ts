import { ComponentFixture, TestBed } from '@angular/core/testing'
import { AlbumsDashboardComponent } from './albums-dashboard.component'
import { AlbumsService } from 'src/app/services/albums/albums.service'
import { UsersService } from 'src/app/services/users/users.service'
import { of } from 'rxjs'
import { Album } from 'src/app/interfaces/albums/album'
import User from 'src/app/interfaces/users/user'

describe('AlbumsDashboardComponent', () => {
  let component: AlbumsDashboardComponent
  let fixture: ComponentFixture<AlbumsDashboardComponent>
  let albumsService: AlbumsService
  let usersService: UsersService

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AlbumsDashboardComponent],
      providers: [AlbumsService, UsersService]
    }).compileComponents()

    fixture = TestBed.createComponent(AlbumsDashboardComponent)
    component = fixture.componentInstance
    albumsService = TestBed.inject(AlbumsService)
    usersService = TestBed.inject(UsersService)
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should fetch albums and users on initialization', () => {
    const albums: Album[] = [
      { id: 1, title: 'Album 1', userId: 1, }, 
      { id: 2, title: 'Album 2', userId: 2,}
    ]
    const users: User[] = [
      {
        "id": 1,
        "name": "Leanne Graham",
        "username": "Bret",
        "email": "Sincere@april.biz",
        "address": {
            "street": "Kulas Light",
            "suite": "Apt. 556",
            "city": "Gwenborough",
            "zipcode": "92998-3874",
            "geo": {
                "lat": "-37.3159",
                "lng": "81.1496"
            }
        },
        "phone": "1-770-736-8031 x56442",
        "website": "hildegard.org",
        "company": {
            "name": "Romaguera-Crona",
            "catchPhrase": "Multi-layered client-server neural-net",
            "bs": "harness real-time e-markets"
        }
    },
    {
        "id": 2,
        "name": "Ervin Howell",
        "username": "Antonette",
        "email": "Shanna@melissa.tv",
        "address": {
            "street": "Victor Plains",
            "suite": "Suite 879",
            "city": "Wisokyburgh",
            "zipcode": "90566-7771",
            "geo": {
                "lat": "-43.9509",
                "lng": "-34.4618"
            }
        },
        "phone": "010-692-6593 x09125",
        "website": "anastasia.net",
        "company": {
            "name": "Deckow-Crist",
            "catchPhrase": "Proactive didactic contingency",
            "bs": "synergize scalable supply-chains"
        }
    },
    ]

    spyOn(albumsService, 'getAlbums').and.returnValue(of(albums))
    spyOn(usersService, 'getUsers').and.returnValue(of(users))

    component.ngOnInit()

    expect(albumsService.getAlbums).toHaveBeenCalled()
    expect(usersService.getUsers).toHaveBeenCalled()
    expect(component.albums).toEqual(albums)
    expect(component.users).toEqual(users)
  })

  it('should update album pagination when calling albumPaging', () => {
    const pageNumber = 2

    component.albumPaging(pageNumber)

    expect(component.albumsPagination.currentPage).toEqual(pageNumber)
  })
})
