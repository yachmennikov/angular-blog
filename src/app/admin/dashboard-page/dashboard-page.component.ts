import { Component, OnInit, OnDestroy } from '@angular/core';
import { PostsServise } from '../shared/posts.servise';
import { Post } from 'src/app/interfaces';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit, OnDestroy {

  posts: Post[];
  subscription: Subscription;
  searchInput = '';
  deleteSub: Subscription;

  constructor(private postServise: PostsServise) { }

  ngOnInit() {
    this.subscription = this.postServise.getAll().subscribe( posts => {
      this.posts = posts;
    });
  }

  remove(id: string) {
    this.deleteSub = this.postServise.removePost(id).subscribe( () => {
      this.posts = this.posts.filter( post => post.id !== id);
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    if (this.deleteSub) {
      this.deleteSub.unsubscribe();
    }
  }
}
