import { Component, OnInit } from '@angular/core';
import Map from '@arcgis/core/Map';
import MapView from '@arcgis/core/views/MapView';
import { Geolocation } from '@capacitor/geolocation';
import Graphic from '@arcgis/core/Graphic'; // Import the Graphic class for markers
import Point from '@arcgis/core/geometry/Point'; // Import Point class for coordinates

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  constructor() { }
  private latitude: number | any;
  private longitude: number | any;


  public async ngOnInit() {
    try {
      // Get the current position using Capacitor Geolocation
      const position = await Geolocation.getCurrentPosition();
      this.latitude = position.coords.latitude;
      this.longitude = position.coords.longitude;

      // Log the coordinates to check the values
      console.log('Current Latitude:', this.latitude);
      console.log('Current Longitude:', this.longitude);

      // Create the map
      const map = new Map({
        basemap: 'topo-vector' // Reference to the base of the map
      });

      // Create the view and use the fetched latitude and longitude for the center point
      const view = new MapView({
        container: 'container', // Reference to the view div created in HTML
        map: map,               // Reference to the map object created before the view
        zoom: 15,               // Sets zoom level to focus on the current location
        center: [this.longitude, this.latitude] // Center the map at the current location
      });

      // Create a point at the current location
      const point = new Point({
        longitude: this.longitude,
        latitude: this.latitude
      });

      // Create a symbol for the marker (icon)
      const markerSymbol = {
        type: 'simple-marker', // autocasts as new SimpleMarkerSymbol()
        color: 'red',         // Marker color
        size: '12px',          // Marker size
        outline: {
          color: [255, 255, 255], // Outline color
          width: 2               // Outline width
        }
      };

      // Create a graphic and set the geometry (point) and symbol (marker)
      const pointGraphic = new Graphic({
        geometry: point,
        symbol: markerSymbol
      });

      // Add the graphic (marker) to the view
      view.graphics.add(pointGraphic);

    } catch (error) {
      console.error('Error getting location', error);
    }
  }
}
