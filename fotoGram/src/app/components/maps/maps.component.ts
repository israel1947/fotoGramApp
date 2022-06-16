import { Component, Input, OnInit, ViewChild } from '@angular/core';


 declare var mapboxgl;

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss'],
})
export class MapsComponent implements OnInit {
  
  @Input() coords:string;
  @ViewChild('map')map;

  constructor() { }

  ngAfterViewInit() { 
    const latLng= this.coords.split(',');
    const lat = Number(latLng[0]);
    const lng = Number(latLng[1]);
    mapboxgl.accessToken = 'pk.eyJ1IjoiaXNyYWVsMTk0NyIsImEiOiJjbDN3MGJiNG0ybG5oM2ZwbmY2ZTUxenNtIn0.Rr00uzgJjsPvf9XUN00EjA';
    const map = new mapboxgl.Map({
      container: this.map.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center:[lng,lat],
      zoom:15
    }); 
    const marker = new mapboxgl.Marker()
      .setLngLat([lng,lat])
      .addTo(map);
  }
  

  ngOnInit() {}

}
