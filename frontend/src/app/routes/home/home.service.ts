import { Injectable  } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RadioControlValueAccessor } from '@angular/forms';
//import * as T from 'leaflet';

declare var L:any;

const iconRetinaUrl = '/frontend/src/assets/images/marker-icon-2x.png';
const iconUrl = '/frontend/src/assets/images/marker-icon.png';
const shadowUrl = '/frontend/src/assets/images/marker-shadow.png';

const defaultIcon = { icon : L.icon({
  iconSize: [15, 25],
  iconAnchor: [15, 41],
  popupAnchor: [1, -34],
  iconUrl: "https://unpkg.com/leaflet@1.4.0/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.4.0/dist/images/marker-shadow.png"
}) };

@Injectable({
  providedIn: 'root'
})

export class HomeService {
  neighborhoods: string = '/assets/data/rj.json';
  dados: string = '/assets/data/dados_.json';
  i: any;
  timestamps: Array<any> = [];
  markers_array: Array<any> = [];
  lightening_color: string = "green";
  constructor(private http: HttpClient) { }

  getColor(d:Number) {
		if(d > 1000){ return '#800026';}
		else if(d > 500){return '#BD0026';}
		else if(d > 200){return '#E31A1C';}
		else if(d > 100){return '#FC4E2A';}
		else if(d > 50){return '#FD8D3C';}
		else if(d > 20){return '#FEB24C';}
		else if(d > 10){return '#FED976';}
    else{return '#FFEDA0';}
	}

  makeTimeStamps(map:any): Array<any>{
    this.http.get(this.dados).subscribe((res: any) => {
      for (this.i = 0; this.i < res.length; this.i++) {
        this.timestamps.push(res[this.i].event_time_offset);
      }
    });
    return this.timestamps;
  }

  makeLightening(map:any): void{
    this.http.get(this.dados).subscribe((res: any) => {
      for (this.i = 0; this.i < res.length; this.i++) {

        const circle = L.circleMarker([res[this.i].event_lat, res[this.i].event_lon], {radius:(res[this.i].lightning_wavelength/500), color:this.getColor(res[this.i].lightning_wavelength)});
        circle.addTo(map);
      }
    });
  }

  makePluviometricStationsMarkers(map:any): any{
    this.http.get(this.neighborhoods).subscribe((res: any) => {
      for (const c of res.features) {
        const lon = c.geometry.x;
        const lat = c.geometry.y;
        const marker = L.marker([lat, lon], defaultIcon);
        this.markers_array.push(marker);
        //const circle = L.circleMarker([lat, lon], {radius:20},{color:'green'});
        marker.addTo(map);
        //circle.addTo(map);
      }
    });
    return this.markers_array;
  }

  makelightning(map:any): void{
    this.http.get(this.neighborhoods).subscribe((res: any) => {
      for (const c of res.features) {
        const lon = c.geometry.x;
        const lat = c.geometry.y;
        //const marker = L.marker([lat, lon], defaultIcon);
        const circle = L.circleMarker([lat, lon], {radius:20},{color:'green'});
        //marker.addTo(map);
        circle.addTo(map);
      }
    });
  }
}
