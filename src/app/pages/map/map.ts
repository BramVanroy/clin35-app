import { Component, ElementRef, Inject, ViewChild, AfterViewInit } from '@angular/core';
import { MapData } from '../../providers/map-data';
import { Platform } from '@ionic/angular';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';
import { PageService } from '../../page.service';

import * as L from 'leaflet'; // Import Leaflet

import { darkStyle } from './map-dark-style';

@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
  styleUrls: ['./map.scss']
})
export class MapPage implements AfterViewInit {
  isOSMMapVisible = true;
  @ViewChild('mapCanvas', { static: true }) mapElement: ElementRef;
  private map: L.Map;


  constructor(
    @Inject(DOCUMENT) private doc: Document,
    public mapfData: MapData,
    public platform: Platform,
    private router: Router,
    private pageService: PageService
  ) { }

  async ngAfterViewInit() {
    // Set the path to the marker icons
    const iconRetinaUrl = 'assets/leaflet/images/marker-icon-2x.png';
    const iconUrl = 'assets/leaflet/images/marker-icon.png';
    const shadowUrl = 'assets/leaflet/images/marker-shadow.png';

    L.Icon.Default.mergeOptions({
      iconRetinaUrl,
      iconUrl,
      shadowUrl,
    });

    // Initialize the map
    const map = L.map(this.mapElement.nativeElement).setView([50.87878, 4.70112], 14);

    // Set up the OSM layer
    L.tileLayer('https://tile.openstreetmap.be/osmbe/{z}/{x}/{y}.png', {
      attribution: '© OSM contributors'
    }).addTo(map);



    // Use your conference data to add markers
    this.mapfData.getMap().subscribe((mapData: any) => {
      mapData.forEach((markerData: any) => {
        const marker = L.marker([markerData.lat, markerData.lng]).addTo(map);
        marker.bindPopup(`<h5>${markerData.name}</h5>`);


      });
    });


    // Adjust the timeout or place it in a more suitable place in your code
    // where you're sure the map container is fully visible and rendered.
    this.platform.ready().then(() => {
      setTimeout(() => map.invalidateSize(), 400);
    });
  }

  showOSMMap() {
    this.pageService.setCurrentPage('city');
    this.router.navigate(['/app/tabs/map']);
  }

  showImageMap() {
    this.pageService.setCurrentPage('campus');
    this.router.navigate(['/app/tabs/campus-map']);
  }

  ionViewDidEnter() {
    // This will be called each time the page becomes active
    // You can trigger map updates or refresh data here
    console.log('View fully entered');
  }

}

