import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as L from 'leaflet';

@Injectable({
  providedIn: 'root'
})

export class HomeService {
  neighborhoods: string = '/assets/data/rj.json';

  constructor(private http: HttpClient) { }

  makeNeighborhoodsMarkers(map: L.Map): void{
    this.http.get(this.neighborhoods).subscribe((res: any) => {
      for (const c of res.features) {
        const lon = c.geometry.x;
        const lat = c.geometry.y;
        const marker = L.marker([lat, lon]);

        marker.addTo(map);
      }

    });
  }
}
