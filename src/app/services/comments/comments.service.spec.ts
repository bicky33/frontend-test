import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { CommentsService } from './comments.service';
import { Comment } from 'src/app/interfaces/comments/comment';

describe('CommentsService', () => {
  let service: CommentsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CommentsService]
    });
    service = TestBed.inject(CommentsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve comments by post ID', () => {
    const postId = 1;
    const mockComments: Comment[] = [
      {
        "postId": 1,
        "id": 1,
        "name": "id labore ex et quam laborum",
        "email": "Eliseo@gardner.biz",
        "body": "laudantium enim quasi est quidem magnam voluptate ipsam eos\ntempora quo necessitatibus\ndolor quam autem quasi\nreiciendis et nam sapiente accusantium"
    },
    {
        "postId": 1,
        "id": 2,
        "name": "quo vero reiciendis velit similique earum",
        "email": "Jayne_Kuhic@sydney.com",
        "body": "est natus enim nihil est dolore omnis voluptatem numquam\net omnis occaecati quod ullam at\nvoluptatem error expedita pariatur\nnihil sint nostrum voluptatem reiciendis et"
    },
    ];

    service.getCommentsByPostId(postId).subscribe(comments => {
      expect(comments).toEqual(mockComments);
    });

    const req = httpMock.expectOne(`${service.urlApi}?postId=${postId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockComments);
  });

  it('should create a new comment', () => {
    const newComment: Comment = { id: 3, postId: 1, name: 'Alice', body: 'New comment', "email": "Jayne_Kuhic@sydney.com", };

    service.createComment(newComment).subscribe(comment => {
      expect(comment).toEqual(newComment);
    });

    const req = httpMock.expectOne(service.urlApi);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newComment);
    req.flush(newComment);
  });

  it('should delete a comment', () => {
    const commentId = 1;

    service.deleteComment(commentId).subscribe(comment => {
      expect(comment.id).toBe(commentId);
    });

    const req = httpMock.expectOne(`${service.urlApi}/${commentId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush({ id: commentId });
  });

  it('should update a comment', () => {
    const updatedComment: Comment = { id: 1, postId: 1, name: 'John Doe', body: 'Updated comment', "email": "Jayne_Kuhic@sydney.com", };

    service.updateComment(updatedComment).subscribe(comment => {
      expect(comment).toEqual(updatedComment);
    });

    const req = httpMock.expectOne(`${service.urlApi}/${updatedComment.id}`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(updatedComment);
    req.flush(updatedComment);
  });
});
