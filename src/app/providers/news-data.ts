import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NewsData {
  private dataUrl = 'https://raw.githubusercontent.com/BramVanroy/clin35-app-data/main/news.json';

  constructor(private http: HttpClient) { }

  private load(): Observable<any> {
    const cacheBuster = new Date().getTime();
    const url = `${this.dataUrl}?cb=${cacheBuster}`;
    return this.http.get(url).pipe(
      map((data: any) => data),
      catchError(error => {
        console.error('Error loading news data', error);
        return of({ newsItems: [] });
      })
    );
  }

  getNews(): Observable<any> {
    return this.load().pipe(
      map(data => data.newsItems)
    );
  }

  getNewsById(id: string): Observable<any> {
    return this.getNews().pipe(
      map(newsItems => newsItems.find(item => item.id === id))
    );
  }
}
