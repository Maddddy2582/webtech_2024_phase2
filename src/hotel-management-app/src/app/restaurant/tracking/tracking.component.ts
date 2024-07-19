import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
// import 'leaflet-routing-machine';

@Component({
  selector: 'app-tracking',
  templateUrl: './tracking.component.html',
  styleUrl: './tracking.component.css'
})
export class TrackingComponent implements OnInit{
  map!: L.Map;


  constructor(){}

  ngOnInit():void {

  //   navigator.geolocation.getCurrentPosition((position) =>{
  //     console.log(position);
  //     this.map = L.map('map').setView([11.032, 77.016], 13);
  
  //     L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  //   attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  // }).addTo(this.map);
  
  //   //   L.marker([11.032, 77.016]).addTo(map)
  //   // .bindPopup('')
  //   // .openPopup();
  //   // 
  //   }
  //   )

  }

  onMapReady(map: any) {
    setTimeout(() => {
      map.invalidateSize();
    }, 0);
}



func(){
  navigator.geolocation.getCurrentPosition((position) =>{
    console.log(position);
    this.map = L.map('map').setView([11.032, 77.016], 13);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(this.map);

    L.marker([11.032, 77.016]).addTo(this.map)
  .bindPopup('')
  .openPopup();
  
  }
  )

  

}

}
