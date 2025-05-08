import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { UserData } from './user-data';

@Injectable({
  providedIn: 'root'
})
export class ConferenceData {
  private dataUrl = 'https://raw.githubusercontent.com/BramVanroy/clin35-app-data/main/data_app.json';
  data: any;

  constructor(public http: HttpClient, public user: UserData) {}

  load(): Observable<any> {
    const cacheBuster = new Date().getTime();
    const url = `${this.dataUrl}?cb=${cacheBuster}`;
    return this.http.get(url).pipe(
      map((data: any) => {
        this.data = data;
        return this.data;
      }),
      catchError(error => {
        console.error('Error loading conference data', error);
        return of({ schedule: [], speakers: [], tracks: [] });
      })
    );
  }

  getTimeline(dayIndex: string, queryText = '', excludeTracks: any[] = [], segment = 'all') {
    return this.load().pipe(
      map((data: any) => {
        const day = data.schedule[0];
        day.shownSessions = 0;

        queryText = queryText.toLowerCase().replace(/,|\.|-/g, ' ');
        const queryWords = queryText.split(' ').filter(w => !!w.trim().length);

        day.groups.forEach((group: any) => {
          group.hide = true;
          group.sessions.forEach((session: any) => {
            this.filterSession(session, queryWords, excludeTracks, segment, dayIndex);
            if (!session.hide) {
              group.hide = false;
              day.shownSessions++;
            }
          });
        });

        return day;
      })
    );
  }

  filterSession(session: any, queryWords: string[], excludeTracks: any[], segment: string, dayIndex: string) {
    let matchesQueryText = false;
    if (queryWords.length) {
      queryWords.forEach((queryWord: string) => {
        if (session.name.toLowerCase().indexOf(queryWord) > -1) {
          matchesQueryText = true;
        }
      });
    } else {
      matchesQueryText = true;
    }

    let matchesTracks = false;
    session.tracks.forEach((trackName: string) => {
      if (excludeTracks.indexOf(trackName) === -1) {
        matchesTracks = true;
      }
    });

    let matchesSegment = false;
    if (segment === 'favorites') {
      if (this.user.hasFavorite(session.id)) {
        matchesSegment = true;
      }
    } else {
      matchesSegment = true;
    }

    let matchesDay = false;
    if (session.days.indexOf(dayIndex) > -1) {
      matchesDay = true;
    }

    session.hide = !(matchesQueryText && matchesTracks && matchesSegment && matchesDay);
  }

  getTracks() {
    return this.load().pipe(
      map((data: any) => {
        return data.tracks.sort();
      })
    );
  }

  getMap() {
    return this.load().pipe(
      map((data: any) => {
        return data.map;
      })
    );
  }
}
