import { AfterViewInit, Component, OnInit } from '@angular/core';
import { HomeService } from './home.service';
declare var L: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements AfterViewInit {
  public map?: any;
  timeStamps: Array<any> = [];
  markers_array: Array<any> = [];
  constructor(private mapService: HomeService) { }

  dps = [{x: 1, y: 10}, {x: 2, y: 13}, {x: 3, y: 18}, {x: 4, y: 20}, {x: 5, y: 17},{x: 6, y: 10}, {x: 7, y: 13}, {x: 8, y: 18}, {x: 9, y: 20}, {x: 10, y: 17}];
	chart: any;

	chartOptions = {
	  exportEnabled: true,
	  data: [{
		type: "line",
		dataPoints: this.dps
	  }]
	}
	getChartInstance(chart: object) {
		this.chart = chart;
		setTimeout(this.updateChart, 1000); //Chart updated every 1 second
	}
	updateChart = () => {
		var yVal = this.dps[this.dps.length - 1].y +  Math.round(5 + Math.random() *(-5-5));
		this.dps.push({x: this.dps[this.dps.length - 1].x + 1, y: yVal});

		if (this.dps.length >  10 ) {
			this.dps.shift();
		}
		this.chart.render();
		setTimeout(this.updateChart, 1000); //Chart updated every 1 second
	}

  ngAfterViewInit(): void {
    this.initMap();

  }

  ngOnInit(){

  }

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
        playerOptions: { transitionTime: 1000, startOver: true }
      }
    });

    var backgroundLayer = L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png");
    this.map.addLayer(backgroundLayer);

    this.markers_array = this.mapService.makePluviometricStationsMarkers(this.map);
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
        20 + '-' + 50,
        50 + '-' + 100,
        100 + "-" + 200,
        200 + "-" + 500,
        500 + "-" + 1000,
        1000 + "+"
      ];

      const grades = [0, 10, 20, 50, 100, 200, 500, 1000];
      div.innerHTML = '<div><b>Legend</b></div>';
      for (let i = 0; i < grades.length; i++) {
        div.innerHTML += '<i style="background:' + vm.mapService.getColor(grades[i]) + '"> &nbsp; &nbsp;</i> &nbsp; &nbsp;'
          + labels[i] + '<br margin=0 />';
      }
      return div;
    };

    legend.addTo(this.map);

  }
}
