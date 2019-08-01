import { ActivatedRoute } from '@angular/router';
import { DataService } from './../../../../services/data.service';
import { Subscription } from 'rxjs';
import { Posts } from './../../../../models/news.interface';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-post',
  templateUrl: './post.page.html',
  styleUrls: ['./post.page.scss'],
})
export class PostPage implements OnInit, OnDestroy {
  post: Posts;
  post$: Subscription;

  constructor(private dataService: DataService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      console.log(paramMap);
      const postId = paramMap.get('postId');
      console.log(postId);
      this.post$ = this.dataService.getPost(postId).subscribe(data => {
        this.post = data;
        console.log(data);
      });
    });
  }

  ngOnDestroy() {
    if (this.post$) {
      this.post$.unsubscribe();
    }
  }

}
