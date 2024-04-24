import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Comment } from 'src/app/interfaces/comments/comment';
import Action from 'src/app/interfaces/common/actionStatus';
import { Post } from 'src/app/interfaces/posts/post';
import User from 'src/app/interfaces/users/user';
import { CommentsService } from 'src/app/services/comments/comments.service';
import { PostsService } from 'src/app/services/posts/posts.service';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  comments !: Comment[]
  comment !: Comment
  user!: User 
  post!: Post
  postId!: number
  actionStatus: Action = Action.CREATE
  constructor(
    private router: ActivatedRoute,
    private postService: PostsService,
    private commentService: CommentsService,
    private userService: UsersService
  ) {
    this.postId = this.router.snapshot.params['id'];
    this.commentService.getCommentsByPostId(this.postId).subscribe((data) => {
      this.comments = data;
    });
    this.postService.getPostById(this.postId).subscribe((data) => {
      this.post = data;
      this.userService.getUserById(this.post.userId.toString()).subscribe((data) => {
        this.user = data;
      });
    });
  }

  createComment(comment: Comment){
    this.comments.push(comment)
  }

  updateComment(comment: Comment){
    this.comments = this.comments.map((c) => {
      if(c.id === comment.id){
        return comment;
      }
      return c;
    });
  }

  openModal(){
    this.postId = this.router.snapshot.params['id'];
    this.actionStatus = Action.CREATE;
  }

  deleteComment(commentId: number){
    this.commentService.deleteComment(commentId).subscribe((data) => {
      this.comments = this.comments.filter((comment) => comment.id !== commentId);
    });
  }

  editComment(comment: Comment) {
    this.comment = comment;
    this.actionStatus = Action.UPDATE;
  }

  ngOnInit(): void {
  }
}
