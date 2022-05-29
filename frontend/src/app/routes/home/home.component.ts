import { Component, OnInit, AfterViewInit } from '@angular/core';
import { latLng, marker, tileLayer, icon } from 'leaflet';
import * as L from 'leaflet';
import { HomeService } from './home.service';

const iconRetinaUrl = '/frontend/src/assets/images/marker-icon-2x.png';
const iconUrl = '/frontend/src/assets/images/marker-icon.png';
const shadowUrl = '/frontend/src/assets/images/marker-shadow.png';

const defaultIcon = L.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});
L.Marker.prototype.options.icon = defaultIcon;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {

  public map: any;

  private initMap(): void{
    this.map = L.map('map', {
      center: [-22.9025440, -43.4734225],
      zoom: 11
    });

    const tiles = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
    tiles.addTo(this.map)
  }

  ngOnInit(): void {

  }

  constructor(private markerService: HomeService){
  }

  ngAfterViewInit(): void {
    this.initMap();
    this.markerService.makeNeighborhoodsMarkers(this.map)
  }
}
