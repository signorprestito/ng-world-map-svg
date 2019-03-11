import { Component, Input, EventEmitter, Output, Inject } from '@angular/core';
import { MapInfoVM } from './models/MapInfoVM';
import { PointVM } from './models/PointVM';
import { SettingsVM, ICustomConfig } from './models/SettingsVM';
 

@Component({
  selector: 'map-svg',
  templateUrl: './svg-map.component.html',
  styleUrls: ['./svg-map.component.scss']
})
export class SvgMapComponent {
  @Input() settings: SettingsVM = new SettingsVM();
  @Input() templatePoint;
  @Input() templateArea;

  @Output() clickPoint: EventEmitter<PointVM> = new EventEmitter<PointVM>();
  @Output() clickArea: EventEmitter<string> = new EventEmitter<string>();

  scriptIsLoaded: boolean = false;

  mapInfo: MapInfoVM = new MapInfoVM();
  constructor(@Inject('configService') private config: ICustomConfig) { }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    var script = document.createElement('script');
    script.src = "https://maps.googleapis.com/maps/api/js?key=" + this.config.googleAPIKey + "&libraries=places";
    document.getElementsByTagName('head')[0].appendChild(script);
    script.onload = () => {
      this.scriptIsLoaded = true;
    };

    this.settings.config = this.config;
  }


  /**
   * Click on country area
   */
  clickAreaF(area: string) {
    this.clickArea.emit(area);
  }

  emitClickPoint(point: PointVM) {
    this.clickPoint.emit(point);
  }

}
