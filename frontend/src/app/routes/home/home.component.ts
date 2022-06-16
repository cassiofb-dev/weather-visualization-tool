import { AfterViewInit, Component, OnInit } from '@angular/core';
import { HomeService } from './home.service';
import { HttpClient } from '@angular/common/http';
//import * as L from 'leaflet';

declare var L: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements AfterViewInit {
  //leafletMap?: L.Map;
  public map?: any;
  timeStamps: Array<any> = [];


  constructor(private mapService: HomeService) { }

  ngAfterViewInit(): void {
    this.initMap();
  }



  // https://apps.socib.es/Leaflet.TimeDimension/examples/example13.html
  // Just an example to configure leaflet with time dimension
  initMap() {
    this.timeStamps = this.mapService.makeTimeStamps(this.map);
    console.log(this.timeStamps);
    this.map = L.map("map", {
      zoom: 11,
      center: [-22.9025440, -43.4734225],
      timeDimension: true,
      timeDimensionControl: true,
      timeDimensionOptions: {
        times: this.timeStamps,
        currentTime: this.timeStamps[0],
        period: "P1M"
      },
      timeDimensionControlOptions: {
        timeSliderDragUpdate: true,
        autoPlay: true,
        playerOptions: { transitionTime: 1000, startOver: false }
      }
    });

    var backgroundLayer = L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png");
    this.map.addLayer(backgroundLayer);

    this.mapService.makePluviometricStationsMarkers(this.map);
    this.mapService.makeLightening(this.map);

    const legend = new (L.Control.extend({
      options: { position: 'bottomright' }
    }));

    const vm = this;
    legend.onAdd = function () {
      const div = L.DomUtil.create('div', 'legend');
      const labels = [
        0 + '-' + 10,
        10 + '-' + 20,
        20+'-'+50,
        50+'-'+100,
        100+"-"+200,
        200+"-"+500,
        500+"-"+1000,
        1000+"+"
      ];

      const grades = [0, 10, 20, 50, 100, 200, 500, 1000];
      div.innerHTML = '<div><b>Legend</b></div>';
      for (let i = 0; i < grades.length; i++) {
        div.innerHTML += '<i style="background:' + vm.mapService.getColor(grades[ i ]) + '"> &nbsp; &nbsp;</i> &nbsp; &nbsp;'
        + labels[i] + '<br margin=0 />';
      }
      return div;
    };
    legend.addTo(this.map);

  }
}

