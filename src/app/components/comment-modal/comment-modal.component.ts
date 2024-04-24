import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Comment } from 'src/app/interfaces/comments/comment';
import Action from 'src/app/interfaces/common/actionStatus';
import { CommentsService } from 'src/app/services/comments/comments.service';

@Component({
  selector: 'app-comment-modal',
  templateUrl: './comment-modal.component.html',
  styleUrls: ['./comment-modal.component.css']
})

export class CommentModalComponent implements OnInit, OnChanges{
  @Input() comment !: Comment
  @Input() actionStatus: Action = Action.CREATE
  @Output() createComment:EventEmitter<Comment> = new EventEmitter<Comment>()
  @Output() updateComment:EventEmitter<Comment> = new EventEmitter<Comment>()
  form !: FormGroup
  isFormValid: boolean = false
  postId: number

  constructor(
    private formBuilder: FormBuilder,
    private commentService: CommentsService,
    private router: ActivatedRoute,
  )
  {
    this.postId = router.snapshot.params['id'] as number;
    this.form = this.formBuilder.group({
      postId: this.postId,
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      body: ['', Validators.required]
    })
  }
  private updateForm(): void{
    this.form.patchValue({
      postId: this.comment.postId,
      name: this.comment.name,
      email: this.comment.email,
      body: this.comment.body
    })
  }


  private initForm(): void{
    this.form = this.formBuilder.group({
      postId: this.postId,
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      body: ['', Validators.required]
    })  } 

  onSubmit(){
    if(this.actionStatus === Action.CREATE){
      this.comment = {
        postId: Number(this.form.value.postId),
        name: this.form.value.name,
        email: this.form.value.email,
        body: this.form.value.body
      } as Comment;
      this.commentService.createComment(this.comment).subscribe((data: Comment) => {    
        this.createComment.emit(data);
      });
    }
    if (this.actionStatus === Action.UPDATE) {
      this.comment = {
        postId: Number(this.form.value.postId),
        name: this.form.value.name,
        email: this.form.value.email,
        body: this.form.value.body,
        id: this.comment.id
      } as Comment;
      this.commentService.updateComment(this.comment).subscribe((data: Comment) => {
        this.updateComment.emit(data);
      });
      
    }
  };
  ngOnInit(): void {
  }
  ngOnChanges(changes: SimpleChanges): void {
    if(changes['actionStatus'].currentValue === Action.UPDATE && changes['actionStatus']){
      this.updateForm();
    }
    if(changes['actionStatus'].currentValue === Action.CREATE && changes['actionStatus']){
      this.initForm();
    }
  }
}
