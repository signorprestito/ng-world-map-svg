import { Component, Input, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { countryCoords } from '../../../utils/utils';
import { SettingsVM } from '../../../models/SettingsVM';

@Component({
  selector: 'app-country-wrap',
  templateUrl: './country-wrap.component.html',
})
export class CountryWrapComponent {
  @Input() country: string;
  @Input() settings: SettingsVM;
  @Output() clickArea: EventEmitter<string> = new EventEmitter<string>();

  svgInfo;

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    this.svgInfo = countryCoords[this.country];

    setTimeout(() => {
      let paths: HTMLCollection = document.getElementsByTagName('path');
      let arrayPaths: [] = [].slice.call(paths);

      arrayPaths.forEach((p: HTMLElement) => {

        if (p.classList.contains(this.country)) {

          if (this.settings.config.countryColors) {
            p.style.fill = this.settings.config.countryColors[this.settings.config.country.indexOf(this.country)];
          }
          p.style.stroke = this.settings.strokeCountryColor;
          this.settings.googleMap ? p.style.strokeWidth = "0" : p.style.strokeWidth = this.settings.strokeCountryWidth;
        }
      });
    }, 100);


  }

  clickAreaF(area: string) {
    this.clickArea.emit(area);
  }
}
