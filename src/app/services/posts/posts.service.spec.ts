import { TestBed } from '@angular/core/testing'
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'

import { PostsService } from './posts.service'
import { environment } from 'src/environments/environment.development'
import { Post } from 'src/app/interfaces/posts/post'

describe('PostsService', () => {
  let service: PostsService
  let httpMock: HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PostsService]
    })
    service = TestBed.inject(PostsService)
    httpMock = TestBed.inject(HttpTestingController)
  })

  afterEach(() => {
    httpMock.verify()
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  it('should retrieve posts by user ID', () => {
    const userId = '123'
    const mockPosts: Post[] = [
      { id: 1, title: 'Post 1', body: 'Body 1', userId: 123 },
      { id: 2, title: 'Post 2', body: 'Body 2', userId: 123 }
    ]

    service.getPostsByUserId(userId).subscribe(posts => {
      expect(posts).toEqual(mockPosts)
    })

    const req = httpMock.expectOne(`${environment.baseUrl}/posts?userId=${userId}`)
    expect(req.request.method).toBe('GET')
    req.flush(mockPosts)
  })

  it('should retrieve a post by ID', () => {
    const postId = 1
    const mockPost: Post = { id: 1, title: 'Post 1', body: 'Body 1', userId: 123 }

    service.getPostById(postId).subscribe(post => {
      expect(post).toEqual(mockPost)
    })

    const req = httpMock.expectOne(`${environment.baseUrl}/posts/${postId}`)
    expect(req.request.method).toBe('GET')
    req.flush(mockPost)
  })

  // Add more tests for createPost, updatePost, and deletePost methods

})
