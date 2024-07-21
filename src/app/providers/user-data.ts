import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class UserData {
  favorites: string[] = [];
  HAS_LOGGED_IN = 'hasLoggedIn';
  HAS_SEEN_TUTORIAL = 'hasSeenTutorial';
  READ_NEWS = 'readNews';

  constructor(
    public storage: Storage
  ) { }

  async loadFavorites() {
    try {
      this.favorites = await this.storage.get('favorites') || [];
    } catch (error) {
      console.error('Error loading favorites from storage', error);
    }
  }

  async saveFavorites() {
    try {
      await this.storage.set('favorites', this.favorites);
    } catch (error) {
      console.error('Error saving favorites to storage', error);
    }
  }


  hasFavorite(sessionName: string): boolean {
    return (this.favorites.indexOf(sessionName) > -1);
  }

  addFavorite(sessionName: string): void {
    this.favorites.push(sessionName);
    this.saveFavorites(); // Save favorites after modifying the array
  }

  removeFavorite(sessionName: string): void {
    const index = this.favorites.indexOf(sessionName);
    if (index > -1) {
      this.favorites.splice(index, 1);
      this.saveFavorites(); // Save favorites after modifying the array
    }
  }

  async markNewsAsRead(newsId: string): Promise<void> {
    try {
      let readNews = await this.storage.get(this.READ_NEWS) || [];
      if (!readNews.includes(newsId)) {
        readNews.push(newsId);
        await this.storage.set(this.READ_NEWS, readNews);
      }
    } catch (error) {
      console.error('Error marking news as read', error);
    }
  }

  async isNewsRead(newsId: string): Promise<boolean> {
    try {
      const readNews = await this.storage.get(this.READ_NEWS) || [];
      return readNews.includes(newsId);
    } catch (error) {
      console.error('Error checking if news is read', error);
      return false;
    }
  }

  async clearReadNews(): Promise<void> {
    try {
      await this.storage.remove(this.READ_NEWS);
    } catch (error) {
      console.error('Error clearing read news', error);
    }
  }

  login(username: string): Promise<any> {
    return this.storage.set(this.HAS_LOGGED_IN, true).then(() => {
      this.setUsername(username);
      return window.dispatchEvent(new CustomEvent('user:login'));
    });
  }

  signup(username: string): Promise<any> {
    return this.storage.set(this.HAS_LOGGED_IN, true).then(() => {
      this.setUsername(username);
      return window.dispatchEvent(new CustomEvent('user:signup'));
    });
  }

  logout(): Promise<any> {
    return this.storage.remove(this.HAS_LOGGED_IN).then(() => {
      return this.storage.remove('username');
    }).then(() => {
      window.dispatchEvent(new CustomEvent('user:logout'));
    });
  }

  setUsername(username: string): Promise<any> {
    return this.storage.set('username', username);
  }

  getUsername(): Promise<string> {
    return this.storage.get('username').then((value) => {
      return value;
    });
  }

  isLoggedIn(): Promise<boolean> {
    return this.storage.get(this.HAS_LOGGED_IN).then((value) => {
      return value === true;
    });
  }

  checkHasSeenTutorial(): Promise<string> {
    return this.storage.get(this.HAS_SEEN_TUTORIAL).then((value) => {
      return value;
    });
  }
}
