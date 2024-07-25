import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WifiInfoService {
  private wifiInfoUrl = 'https://yourdomain.com/path/to/wifi-info.json'; // Update with the actual URL

  constructor(private http: HttpClient) {}

  getWifiInfo(): Observable<any> {
    const cacheBuster = new Date().getTime();
    const url = `${this.wifiInfoUrl}?cb=${cacheBuster}`;
    return this.http.get(url).pipe(
      map((data: any) => {
        return data;
      }),
      catchError(error => {
        console.error('Error loading Wi-Fi info', error);
        return of({ ssid: 'N/A', password: 'N/A' });
      })
    );
  }
}
