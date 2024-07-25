import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, Platform } from '@ionic/angular';
import { StatusBar } from '@capacitor/status-bar';
import { SplashScreen } from '@capacitor/splash-screen';
import { Storage } from '@ionic/storage-angular';
import { UserData } from './providers/user-data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  appPages = [
    {
      title: 'News',
      url: '/app/tabs/news',
      icon: 'newspaper'
    },
    {
      title: 'Schedule',
      url: '/app/tabs/schedule',
      icon: 'calendar'
    },
    {
      title: 'Maps',
      url: '',
      icon: 'map',
      children: [
        {
          title: 'City Map',
          url: '/app/tabs/map',
          icon: 'map'
        },
        {
          title: 'Campus Map',
          url: '/app/tabs/campus-map',
          icon: 'navigate'
        }
      ]
    },
    {
      title: 'About',
      url: '/app/tabs/about',
      icon: 'information-circle'
    }
  ];
  loggedIn = false;
  dark = false;
  submenuOpen = false;

  constructor(
    private menu: MenuController,
    private platform: Platform,
    private router: Router,
    private storage: Storage,
    private userData: UserData,
  ) {
    this.initializeApp();
  }

  async ngOnInit() {
    try {
      console.log("starting app component");
      await this.storage.create();
      // this.checkLoginStatus();
      // this.listenForLoginEvents();
    } catch (error) {
      console.error('Error during ngOnInit:', error);
    }
  }

  initializeApp() {
    console.log('initializing app');
    this.platform.ready().then(() => {
      if (this.platform.is('hybrid')) {
        StatusBar.hide();
        SplashScreen.hide();
      }
      this.handleBackButton();
    });
  }

  handleBackButton() {
    const defaultUrl = '/app/tabs/news';
    const scheduleUrl = '/app/tabs/schedule';

    this.platform.backButton.subscribeWithPriority(10, (processNextHandler) => {
      const currentUrl = this.router.url;
      if (currentUrl === defaultUrl) {
        navigator['app'].exitApp(); // Close the app
      } else if (currentUrl.startsWith('/app/tabs/schedule/session/')) {
        this.router.navigateByUrl(scheduleUrl); // Navigate to the 'Schedule' tab
      } else if (currentUrl.startsWith('/app/tabs')) {
        this.router.navigateByUrl(defaultUrl); // Navigate to the 'News' tab
      } else {
        // Allow the default back button action
        processNextHandler();
      }
    });
  }

  toggleSubmenu() {
    this.submenuOpen = !this.submenuOpen;
  }
}
