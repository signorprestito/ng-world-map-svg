import { Component, Inject, OnInit } from '@angular/core';
import { SettingsVM } from './modules/svg-map/models/SettingsVM';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  settings: SettingsVM = new SettingsVM();

  constructor() { }

  ngOnInit() {
    this.settings.googleMap = true;
    this.settings.zoomMap = 4;
    this.settings.styleGoogleMap = "dark";
    this.settings.strokeCountryColor = "black";
    this.settings.strokeCountryWidth = "1px";
    this.settings.countryColor = "pink";
    this.settings.markerColor = "white";
    this.settings.openModal = true;
    this.settings.modalWidth = 50;


    this.settings.listPoints = [
      { city: 'London', address: '83 Ilchester Road', type: 'marker' },
      { city: 'Dublin', address: '', type: 'parking' },
      { city: 'Torino', address: 'Via dell\'Arsenale 35', type: 'marker' },
      { city: 'Bari', address: 'Via Giovanni Amendola 162/A', type: 'info' },
      { city: 'Paris', address: '', type: 'marker' },
      { city: 'Lyon', address: '', type: 'restaurant' },
      { city: 'Madrid', address: '', type: 'info' },
      { city: 'New York', address: '', type: 'marker' },
      { city: 'New Delhi', address: '', type: 'info' },
      { city: 'Brasilia', address: '', type: 'info' }
    ];

  }

  emitClickPoint(point) {
    console.log(point)
  }

  emitClickArea(area) {
    console.log(area)
  }
}
