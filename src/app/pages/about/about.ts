import { Component } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { PopoverPage } from '../about-popover/about-popover';
import { WifiInfoService } from '../../providers/wifi-info.service'; // Import the service

@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
  styleUrls: ['./about.scss'],
})
export class AboutPage {
//  location = 'madison';
//  conferenceDate = '2047-05-17';
  wifiInfo: any = { ssid: '', password: '', valid_date: '', image_link: ''};

 // selectOptions = {
 //   header: 'Select a Location'
 // };

  constructor(
    public popoverCtrl: PopoverController,
    private wifiInfoService: WifiInfoService // Inject the service
  ) { }

  ngOnInit() {
    this.loadWifiInfo();
  }

  async presentPopover(event: Event) {
    const popover = await this.popoverCtrl.create({
      component: PopoverPage,
      event
    });
    await popover.present();
  }

  loadWifiInfo() {
    this.wifiInfoService.getWifiInfo().subscribe(data => {
      this.wifiInfo = data;
    });
  }

}
