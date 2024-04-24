import { ComponentFixture, TestBed } from '@angular/core/testing'
import { ActivatedRoute } from '@angular/router'
import { of } from 'rxjs'
import { AlbumsService } from 'src/app/services/albums/albums.service'
import { PostsService } from 'src/app/services/posts/posts.service'
import { UsersService } from 'src/app/services/users/users.service'
import { ProfilesComponent } from './profiles.component'

describe('ProfilesComponent', () => {
  let component: ProfilesComponent
  let fixture: ComponentFixture<ProfilesComponent>
  let mockActivatedRoute: any
  let mockUserService: any
  let mockAlbumsService: any
  let mockPostsService: any

  beforeEach(() => {
    mockActivatedRoute = {
      snapshot: {
        paramMap: {
          get: () => '1' // Assuming the user ID is '1'
        }
      }
    }

    mockUserService = {
      getUser: jasmine.createSpy('getUser').and.returnValue(of({ id: '1', name: 'John Doe' }))
    }

    mockAlbumsService = {
      getAlbums: jasmine.createSpy('getAlbums').and.returnValue(of([]))
    }

    mockPostsService = {
      getPosts: jasmine.createSpy('getPosts').and.returnValue(of([]))
    }

    TestBed.configureTestingModule({
      declarations: [ProfilesComponent],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: UsersService, useValue: mockUserService },
        { provide: AlbumsService, useValue: mockAlbumsService },
        { provide: PostsService, useValue: mockPostsService }
      ]
    }).compileComponents()

    fixture = TestBed.createComponent(ProfilesComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should fetch user details on initialization', () => {
    expect(mockUserService.getUser).toHaveBeenCalledWith('1')
    expect(component.user).toEqual({ 
      id: jasmine.any(Number),
      name: jasmine.any(String),
      username: jasmine.any(String),
      email: jasmine.any(String),
      address: jasmine.any(Object),
      phone: jasmine.any(String),
      website: jasmine.any(String),
      company: jasmine.any(Object)
    })
  })

  it('should fetch albums on initialization', () => {
    expect(mockAlbumsService.getAlbums).toHaveBeenCalledWith('1')
    expect(component.albums).toEqual([])
  })

  it('should fetch posts on initialization', () => {
    expect(mockPostsService.getPosts).toHaveBeenCalledWith('1')
    expect(component.posts).toEqual([])
  })

})