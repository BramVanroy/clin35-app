import { AfterViewInit, Component } from '@angular/core';
import PinchZoom from 'pinch-zoom-js';
import { Router } from '@angular/router';
import { PageService } from '../../page.service';


@Component({
    selector: 'page-campus-map',
    templateUrl: 'campus-map.html',
    styleUrls: ['./campus-map.scss'],
  })
  export class CampusMapPage implements AfterViewInit {

    constructor(
      private router: Router,
      private pageService: PageService
    ) {}
    
    ngAfterViewInit() {
      const element = document.getElementById('pinch-zoom-container');
      if (element) {
        new PinchZoom(element, {});
        }
      }

      showOSMMap() {
        this.pageService.setCurrentPage('city');
        this.router.navigate(['/app/tabs/map']);
      }
      
      showImageMap() {
        this.pageService.setCurrentPage('campus');
        this.router.navigate(['/app/tabs/campus-map']);
      }
      
      isActive(page: string): boolean {
        return this.pageService.getCurrentPage() === page;
      }

      getIconName(page: string): string {
        if (page === 'city') {
          return this.isActive('city') ? 'map' : 'map-outline';
        }
        if (page === 'campus') {
          return this.isActive('campus') ? 'navigate' : 'navigate-outline';
        }
        return '';
      }

    }        

