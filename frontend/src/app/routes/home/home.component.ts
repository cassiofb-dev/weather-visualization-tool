import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MapOptions, WMSOptions } from 'leaflet';

declare var L: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements AfterViewInit {
  leafletMap?: L.Map;

  constructor() { }

  ngAfterViewInit(): void {
    this.leafletTimeDimensionExample13Options();
  }

  // https://apps.socib.es/Leaflet.TimeDimension/examples/example13.html
  // Just an example to configure leaflet with time dimension
  leafletTimeDimensionExample13Options() {
    const zeroDate = new Date(0, 0, 0, 0);

    this.leafletMap = L.map('map', {
      zoom: 8,
      fullscreenControl: true,
      timeDimension: true,
      timeDimensionControl: true,
      timeDimensionControlOptions: {
        position: 'bottomleft',
        playerOptions: {
          transitionTime: 1000,
        }
      },
      center: [39.3, 2.9]
    } as MapOptions);

    const sapoWSMURL = "https://thredds.socib.es/thredds/wms/operational_models/oceanographical/wave/model_run_aggregation/sapo_ib/sapo_ib_best.ncd";

    const sapoHeightLayer = L.tileLayer.wms(sapoWSMURL, {
      layers: 'significant_wave_height',
      format: 'image/png',
      transparent: true,
      colorscalerange: '0,3',
      abovemaxcolor: "extend",
      belowmincolor: "extend",
      numcolorbands: 100,
      styles: 'areafill/scb_bugnylorrd',
    } as WMSOptions);

    const sapoMeanDirectionLayer = L.nonTiledLayer.wms(sapoWSMURL, {
      layers: 'average_wave_direction',
      format: 'image/png',
      transparent: true,
      colorscalerange: '1,1',
      abovemaxcolor: "extend",
      belowmincolor: "extend",
      markerscale: 15,
      markerspacing: 12,
      markerclipping: true,
      styles: 'prettyvec/greyscale',
    });

    const sapoPeakDirectionLayer = L.nonTiledLayer.wms(sapoWSMURL, {
      layers: 'direction_of_the_peak_of_the_spectrum',
      format: 'image/png',
      transparent: true,
      colorscalerange: '0,2',
      abovemaxcolor: "extend",
      belowmincolor: "extend",
      markerscale: 15,
      markerspacing: 12,
      markerclipping: true,
      styles: 'prettyvec/greyscale',
    });

    const markers = [{
      name: 'Sa Dragonera',
      position: [39.555, 2.102],
      platformName: 'Buoy at Sa Dragonera',
      platform: 18,
      instrument: 68,
      variable: 17
    }, {
      name: 'Alcúdia',
      position: [39.8, 3.216]
    }, {
      name: 'Palma',
      position: [39.492847, 2.700405],
      platformName: 'Buoy at Palma Bay',
      platform: 143,
      instrument: 296,
      variable: 90047
    }, {
      name: 'Ciutadella',
      position: [39.976, 3.761]
    }, {
      name: 'Ibiza Channel',
      platformName: 'Buoy at Ibiza Channel',
      position: [38.82445, 0.783667],
      platform: 146,
      instrument: 314,
      variable: 90047
    }];

    const sapoHeightTimeLayer = L.timeDimension.layer.wms.timeseries(sapoHeightLayer, {
      updateTimeDimension: true,
      markers: markers,
      name: "Significant wave height",
      units: "m",
      enableNewMarkers: true,
    });

    const sapoMeanDirectionTimeLayer = L.timeDimension.layer.wms(sapoMeanDirectionLayer);
    const sapoPeakDirectionTimeLayer = L.timeDimension.layer.wms(sapoPeakDirectionLayer);

    const sapoLegend = L.control({
      position: 'bottomright'
    });

    sapoLegend.onAdd = function () {
      const src = sapoWSMURL + "?SERVICE=WMS&VERSION=1.1.1&REQUEST=GetLegendGraphic&LAYER=significant_wave_height&colorscalerange=0,3&PALETTE=scb_bugnylorrd&numcolorbands=100&transparent=TRUE";
      const div = L.DomUtil.create('div', 'info legend');
      div.innerHTML +=
        '<img src="' + src + '" alt="legend">';
      return div;
    };

    const sapoMeanDirectionLegend = L.control({
      position: 'bottomright',
    });

    sapoMeanDirectionLegend.onAdd = function () {
      const div = L.DomUtil.create('div', 'info legend');
      div.innerHTML += '<img src="assets/images/black-arrow.png" /> mean direction';
      return div;
    };

    const sapoPeakDirectionLegend = L.control({
      position: 'bottomright'
    });
    sapoPeakDirectionLegend.onAdd = function () {
      const div = L.DomUtil.create('div', 'info legend');
      div.innerHTML += '<img src="assets/images/grey-arrow.png" /> peak direction';
      return div;
    };

    const overlayMaps = {
      "SAPO - significant wave height": sapoHeightTimeLayer,
      "SAPO - average wave direction": sapoMeanDirectionTimeLayer,
      "SAPO - direction of the peak": sapoPeakDirectionTimeLayer
    };

    if (!this.leafletMap) return;
    const leafletMap = this.leafletMap;

    leafletMap.on('overlayadd', function (eventLayer: any) {
      if (eventLayer.name == 'SAPO - significant wave height') {
        sapoLegend.addTo(leafletMap);
      } else if (eventLayer.name == 'SAPO - average wave direction') {
        sapoMeanDirectionLegend.addTo(leafletMap);
      } else if (eventLayer.name == 'SAPO - direction of the peak') {
        sapoPeakDirectionLegend.addTo(leafletMap);
      }
    });

    leafletMap.on('overlayremove', function (eventLayer: any) {
      if (eventLayer.name == 'SAPO - significant wave height') {
        leafletMap.removeControl(sapoLegend);
      } else if (eventLayer.name == 'SAPO - average wave direction') {
        leafletMap.removeControl(sapoMeanDirectionLegend);
      } else if (eventLayer.name == 'SAPO - direction of the peak') {
        leafletMap.removeControl(sapoPeakDirectionLegend);
      }
    });

    var baseLayers = this.getCommonBaseLayers(leafletMap); // see baselayers.js
    L.control.layers(baseLayers, overlayMaps).addTo(leafletMap);

    sapoHeightTimeLayer.addTo(leafletMap);
    sapoPeakDirectionTimeLayer.addTo(leafletMap);
    sapoMeanDirectionTimeLayer.addTo(leafletMap);
  }

  getCommonBaseLayers(map: any) {
    const osmLayer = L.tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
    });
    const bathymetryLayer = L.tileLayer.wms("https://ows.emodnet-bathymetry.eu/wms", {
      layers: 'emodnet:mean_atlas_land',
      format: 'image/png',
      transparent: true,
      attribution: "EMODnet Bathymetry",
      opacity: 0.8
    });
    const coastlinesLayer = L.tileLayer.wms("https://ows.emodnet-bathymetry.eu/wms", {
      layers: 'coastlines',
      format: 'image/png',
      transparent: true,
      attribution: "EMODnet Bathymetry",
      opacity: 0.8
    });
    const bathymetryGroupLayer = L.layerGroup([bathymetryLayer, coastlinesLayer]);
    bathymetryGroupLayer.addTo(map);
    return {
      "EMODnet Bathymetry": bathymetryGroupLayer,
      "OSM": osmLayer
    };
  }
}
