import { AfterViewInit, Component } from '@angular/core';
import PinchZoom from 'pinch-zoom-js';
import { Router } from '@angular/router';


@Component({
    selector: 'page-campus-map',
    templateUrl: 'campus-map.html',
    styleUrls: ['./campus-map.scss'],
  })
  export class CampusMapPage implements AfterViewInit {

    constructor(private router: Router) {}
    
    ngAfterViewInit() {
      const element = document.getElementById('pinch-zoom-container');
      if (element) {
        new PinchZoom(element, {});
        }
      }

      showOSMMap() {
        this.router.navigate(['/app/tabs/map']);
      }
      
      showImageMap() {
        this.router.navigate(['/app/tabs/campus-map']);
      }
      

    }        

