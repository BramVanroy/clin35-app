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
    this.map = L.map(this.mapElement.nativeElement).setView([50.86878, 4.70112], 13);

    // Set up the OSM layer
    L.tileLayer('https://tile.openstreetmap.be/osmbe/{z}/{x}/{y}.png', {
      attribution: '© OSM contributors'
    }).addTo(this.map);

    // Use your conference data to add markers
    this.mapfData.getMap().subscribe((mapData: any) => {
      mapData.forEach((markerData: any) => {
        const marker = L.marker([markerData.lat, markerData.lng], { icon: this.getCustomIcon(markerData.type) }).addTo(this.map);
        marker.bindPopup(`<h5>${markerData.name}</h5>`);
      });
      this.addLegend(); // Add the legend after the markers are added
    });

    // Adjust the timeout or place it in a more suitable place in your code
    // where you're sure the map container is fully visible and rendered.
    this.platform.ready().then(() => {
      setTimeout(() => this.map.invalidateSize(), 400);
    });
  }

  getCustomIcon(type: string): L.Icon {
    let iconUrl = 'assets/icons/marker-icon.png'; // Default icon
    switch (type) {
      case 'irishcollege':
        iconUrl = 'assets/icons/marker-icon-green.png';
        break;
      case 'residence':
        iconUrl = 'assets/icons/marker-icon-orange.png';
        break;
      case 'restaurant':
        iconUrl = 'assets/icons/marker-icon-red.png';
        break;
      case 'campus':
        iconUrl = 'assets/icons/marker-icon-blue.png';
        break;
      // Add more cases for different types
      default:
        iconUrl = 'assets/icons/marker-icon.png';
        break;
    }

    return L.icon({
      iconUrl: iconUrl,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowUrl: 'assets/icons/marker-shadow.png',
      shadowSize: [41, 41]
    });
  }

  addLegend() {
    const legend = L.control({ position: 'bottomright' });

    legend.onAdd = () => {
      const div = L.DomUtil.create('div', 'info legend');
      const types = ['restaurant', 'residence', 'irishcollege'];
      const labels = ['Restaurants', 'Student Residences', 'Lecturer\'s Accommodation'];
      const colors = ['assets/icons/marker-icon-red.png', 'assets/icons/marker-icon-orange.png', 'assets/icons/marker-icon-green.png'];

      for (let i = 0; i < types.length; i++) {
        div.innerHTML +=
          `<div><img src="${colors[i]}" style="width:25px;height:41px;vertical-align:middle;margin-right:5px;"> ${labels[i]}</div>`;
      }

      return div;
    };

    legend.addTo(this.map);
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
