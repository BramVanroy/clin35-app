import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MapData {
  private mapDataUrl = 'https://raw.githubusercontent.com/timvdc/esslli2024/main/map_data.json'; // URL of the separate map data JSON
  mapData: any;

  constructor(public http: HttpClient) {}

  load(): Observable<any> {
    const cacheBuster = new Date().getTime();
    const url = `${this.mapDataUrl}?cb=${cacheBuster}`;
    return this.http.get(url).pipe(
      map((data: any) => {
        this.mapData = data;
        return this.mapData;
      }),
      catchError(error => {
        console.error('Error loading map data', error);
        return of({ map: [] });
      })
    );
  }

  getMap(): Observable<any> {
    return this.load().pipe(
      map((data: any) => {
        return data.map;
      })
    );
  }
}
