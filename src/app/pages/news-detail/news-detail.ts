import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NewsData } from '../../providers/news-data';
import { UserData } from '../../providers/user-data';

@Component({
  selector: 'app-news-detail',
  templateUrl: './news-detail.html',
  styleUrls: ['./news-detail.scss'],
})
export class NewsDetailPage implements OnInit {

  newsItem: any;
  defaultHref = '';
  @Output() readStatusChanged: EventEmitter<string> = new EventEmitter<string>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private newsData: NewsData,
    private userData: UserData
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.newsData.getNewsById(id).subscribe({
        next: async data => {
          this.newsItem = data;
          await this.userData.markNewsAsRead(id);
          this.readStatusChanged.emit(id); // Emit the event
          console.log(`Marked news item ${id} as read`);
        },
        error: error => {
          console.error('Error fetching news item:', error);
          this.router.navigate(['/app/tabs/news']);
        }
      });
    } else {
      this.router.navigate(['/app/tabs/news']);
    }
  }

  ionViewDidEnter() {
    this.defaultHref = `/app/tabs/news`;
  }

}
