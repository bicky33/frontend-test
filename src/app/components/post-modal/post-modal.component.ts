import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import Action from 'src/app/interfaces/common/actionStatus';
import { Post } from 'src/app/interfaces/posts/post';
import { CommentsService } from 'src/app/services/comments/comments.service';
import { PostsService } from 'src/app/services/posts/posts.service';

@Component({
  selector: 'app-post-modal',
  templateUrl: './post-modal.component.html',
  styleUrls: ['./post-modal.component.css']
})
export class PostModalComponent implements OnChanges {
  @Input() post !: Post
  @Input() actionStatus: Action = Action.CREATE
  @Output() createPost:EventEmitter<Post> = new EventEmitter<Post>()
  @Output() updatePost:EventEmitter<Post> = new EventEmitter<Post>()
  form !: FormGroup
  isFormValid: boolean = false
  userId: number

  constructor(
    private formBuilder: FormBuilder,
    private postService: PostsService,
    private router: ActivatedRoute,
  )
  {
    this.userId = router.snapshot.params['id'] as number;
    this.form = this.formBuilder.group({
      userId: this.userId,
      title: ['', Validators.required],
      body: ['', Validators.required]
    })
  }


  private updateForm(): void{
    this.form.patchValue({
      userId: this.post.userId,
      title: this.post.title,
      body: this.post.body
    })
  }

  private initForm(): void{
    this.form = this.formBuilder.group({
      id: this.post.id,
      userId: this.userId,
      title: ['', Validators.required],
      body: ['', Validators.required]
    })
  }

  onSubmit(){
    if(this.actionStatus === Action.CREATE){
      this.post = {
        id: 0,
        userId: Number(this.form.value.userId),
        title: this.form.value.title,
        body: this.form.value.body
      }
      this.postService.createPost(this.post).subscribe((data) => {
        this.createPost.emit(data);
      });
    }

    if(this.actionStatus === Action.UPDATE){
      this.post = {
        id: this.post.id,
        userId: Number(this.form.value.userId),
        title: this.form.value.title,
        body: this.form.value.body
      }
      this.postService.updatePost(this.post).subscribe((data: Post) => {
        this.updatePost.emit(data);
      });
    }
  
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(this.actionStatus === Action.CREATE) {
      this.initForm();
    }
    if (this.actionStatus === Action.UPDATE) {
      this.updateForm();
    }
  }

}
