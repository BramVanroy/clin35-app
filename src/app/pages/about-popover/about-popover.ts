import { Component } from '@angular/core';

import { PopoverController } from '@ionic/angular';

@Component({
  template: `
    <ion-list>
      <ion-item button (click)="close('https://2024.esslli.eu/about-esslli/code-of-conduct.html')">
        <ion-label>Code of Conduct</ion-label>
      </ion-item>
      <ion-item button (click)="close('https://2024.esslli.eu/about-esslli/trusted-person.html')">
        <ion-label>Trusted Person</ion-label>
      </ion-item>
    </ion-list>
  `
})
export class PopoverPage {
  constructor(public popoverCtrl: PopoverController) {}

  support() {
    // this.app.getRootNavs()[0].push('/support');
    this.popoverCtrl.dismiss();
  }

  close(url: string) {
    window.open(url, '_blank');
    this.popoverCtrl.dismiss();
  }
}
