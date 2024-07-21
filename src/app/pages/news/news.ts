import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NewsData } from '../../providers/news-data';
import { UserData } from '../../providers/user-data';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-news',
  templateUrl: './news.html',
  styleUrls: ['./news.scss'],
})
export class NewsPage implements OnInit {

  newsItems: any[] = [];

  constructor(
    private newsData: NewsData,
    private userData: UserData,
    private loadingController: LoadingController,
    private router: Router
  ) { }

  ngOnInit() {
    this.loadNews();
  }

  ionViewWillEnter() {
    this.loadNews();
  }


  async loadNews() {
    this.newsData.getNews().subscribe({
      next: async data => {
        console.log('Fetched news data:', data); // Debug log
        this.newsItems = data;
        await this.checkReadStatus();
        console.log('News items with read status:', this.newsItems); // Debug log
      },
      error: async error => {
        console.error('Error fetching news:', error); // Debug log
      }
    });
  }

  async checkReadStatus() {
    for (let item of this.newsItems) {
      item.isRead = await this.userData.isNewsRead(item.id);
      console.log(`Item ID: ${item.id}, isRead: ${item.isRead}`); // Debug log
    }
  }

  async resetReadNews() {
    await this.userData.clearReadNews();
    await this.loadNews();
  }

  async markAsRead(item: any) {
    await this.userData.markNewsAsRead(item.id);
    item.isRead = true;
  }

  async openMessage(item: any) {
    // Ensure the item is marked as read when opened
    await this.markAsRead(item);
    console.log('Open message:', item.fullMessage); // Debug log
    // Perform navigation after marking as read
    this.router.navigate(['/app/tabs/news/detail', item.id]);
  }
}
