import { ComponentFixture, TestBed } from '@angular/core/testing'
import { ActivatedRoute } from '@angular/router'
import { of } from 'rxjs'
import { CommentsService } from 'src/app/services/comments/comments.service'
import { PostsService } from 'src/app/services/posts/posts.service'
import { UsersService } from 'src/app/services/users/users.service'
import { PostsComponent } from './posts.component'

describe('PostsComponent', () => {
  let component: PostsComponent
  let fixture: ComponentFixture<PostsComponent>
  let mockActivatedRoute: any
  let mockPostsService: any
  let mockCommentsService: any
  let mockUsersService: any

  beforeEach(() => {
    mockActivatedRoute = {
      snapshot: {
        paramMap: {
          get: () => '1' // Assuming postId is always '1' for this test
        }
      }
    }

    mockPostsService = jasmine.createSpyObj('PostsService', ['getPost'])
    mockPostsService.getPost.and.returnValue(of({ /* mock post data */ }))

    mockCommentsService = jasmine.createSpyObj('CommentsService', ['getComments'])
    mockCommentsService.getComments.and.returnValue(of([{ /* mock comment data */ }]))

    mockUsersService = jasmine.createSpyObj('UsersService', ['getUser'])
    mockUsersService.getUser.and.returnValue(of({ /* mock user data */ }))

    TestBed.configureTestingModule({
      declarations: [PostsComponent],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: PostsService, useValue: mockPostsService },
        { provide: CommentsService, useValue: mockCommentsService },
        { provide: UsersService, useValue: mockUsersService }
      ]
    }).compileComponents()

    fixture = TestBed.createComponent(PostsComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should fetch post, comments, and user data on initialization', () => {
    expect(mockPostsService.getPost).toHaveBeenCalledWith(1)
    expect(mockCommentsService.getComments).toHaveBeenCalledWith(1)
    expect(mockUsersService.getUser).toHaveBeenCalled()
    expect(component.post).toBeDefined()
    expect(component.comments).toBeDefined()
    expect(component.user).toBeDefined()
  })


})
