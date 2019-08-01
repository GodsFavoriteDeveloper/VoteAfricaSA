import { Subscription } from 'rxjs';
import { Posts } from './../../../models/news.interface';
import { DataService } from './../../../services/data.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.page.html',
  styleUrls: ['./posts.page.scss'],
})
export class PostsPage implements OnInit, OnDestroy {
  posts: Posts[];
  featured: Posts;
  count = [1, 2, 3, 4, 5, 6];
  posts$: Subscription;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.posts$ = this.dataService.getPosts().subscribe(data => {
      console.log(data);
      this.featured = data[0];
      this.featured.category = this.featured.category.toUpperCase();
      if (data.length > 1) {
        this.posts = data.splice(1);
      }
    });
  }

  ngOnDestroy() {
    if (this.posts$) {
      this.posts$.unsubscribe();
    }
  }

}
