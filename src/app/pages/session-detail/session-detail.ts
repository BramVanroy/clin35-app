import { Component } from '@angular/core';

import { ConferenceData } from '../../providers/conference-data';
import { ActivatedRoute } from '@angular/router';
import { UserData } from '../../providers/user-data';

@Component({
  selector: 'page-session-detail',
  styleUrls: ['./session-detail.scss'],
  templateUrl: 'session-detail.html'
})
export class SessionDetailPage {
  session: any;
  isFavorite = false;
  defaultHref = '';

  constructor(
    private dataProvider: ConferenceData,
    private userProvider: UserData,
    private route: ActivatedRoute
  ) { }

  ionViewWillEnter() {
    this.dataProvider.load().subscribe((data: any) => {
      if (data && data.schedule && data.schedule[0] && data.schedule[0].groups) {
        const sessionId = this.route.snapshot.paramMap.get('sessionId');
        for (const group of data.schedule[0].groups) {
          if (group && group.sessions) {
            for (const session of group.sessions) {
              if (session && session.id === sessionId) {
                this.session = session;
                console.log('session', this.session);
                this.isFavorite = this.userProvider.hasFavorite(
                  this.session.id
                );

                break;
              }
            }
          }
        }
      }
    });
  }

  ionViewDidEnter() {
    this.defaultHref = `/app/tabs/schedule`;
  }

  sessionClick(item: string) {
    console.log('Clicked', item);
  }

  toggleFavorite() {
    console.log('id', this.userProvider, this.session, this.session.id, this.isFavorite)
    if (this.userProvider.hasFavorite(this.session.id)) {
      this.userProvider.removeFavorite(this.session.id);
      this.isFavorite = false;
    } else {
      this.userProvider.addFavorite(this.session.id);
      this.isFavorite = true;
    }
  }

  shareSession() {
    console.log('Clicked share session');
  }

  openLink(url: string) {
    window.open(url, '_blank');
  }

}
