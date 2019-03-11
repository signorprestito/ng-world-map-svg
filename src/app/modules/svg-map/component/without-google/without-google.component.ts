import { Component, Input, SimpleChanges, Output, EventEmitter, ViewChild, ViewContainerRef } from '@angular/core';
import { GoogleDirection } from '../../models/GoogleDirection';
import { PointVM } from '../../models/PointVM';
import { SettingsVM } from '../../models/SettingsVM';
import { MapInfoVM } from '../../models/MapInfoVM';
import { MatDialog } from '@angular/material';
import { DialogPointComponent } from '../../component/dialog-point/dialog-point.component';
import { DialogAreaComponent } from '../../component/dialog-area/dialog-area.component';
import { countryCoords } from '../../utils/utils';


declare var google: any;

@Component({
  selector: 'app-without-google',
  templateUrl: './without-google.component.html',
  styleUrls: ['./without-google.component.scss']
})
export class WithoutGoogleComponent {
  @Input() settings: SettingsVM = new SettingsVM();
  @Input() mapInfo: MapInfoVM = new MapInfoVM();
  @Input() templatePoint;
  @Input() templateArea;

  @Output() clickPoint: EventEmitter<PointVM> = new EventEmitter<PointVM>();
  @Output() clickArea: EventEmitter<string> = new EventEmitter<string>();

  @ViewChild('mySVG', { read: ViewContainerRef }) testOutlet: ViewContainerRef;

  private MAP_WIDTH: number = 610.30981;
  private MAP_HEIGHT: number = 792.58575;

  private axisX_start: number;
  private axisX_end: number;
  private axisY_start: number;
  private axisY_end: number;

  private _ref;


  constructor(
    public dialog: MatDialog,
  ) { }


  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    if (changes) {
          this.settings.country=this.settings.config.country[0];
          //set country variables and points
          this.MAP_WIDTH = countryCoords[this.settings.country].width;
          this.MAP_HEIGHT = countryCoords[this.settings.country].height;

          //set X variables
          this.axisX_start = this._getX(countryCoords[this.settings.country].west);
          this.axisX_end = this._getX(countryCoords[this.settings.country].est);
          //set Y variables
          this.axisY_start = this._getY(countryCoords[this.settings.country].nord);
          this.axisY_end = this._getY(countryCoords[this.settings.country].sud);
          //generate points
          this.settings.listPoints.forEach(point => {
            this._getPointInfo(point);
          });
     }
  }

  /**
   * Get point coordinate and transform in x,y value
   */
  private _getPointInfo(point: PointVM) {
    let pointLng: number;
    let pointLat: number;

    this._getLatLong(point.address + "," + point.city).then((resp) => {
      pointLng = resp.long;
      pointLat = resp.lat;

      //set x and y value of point
      let actualLngX: number = this._getX(pointLng);
      let actualLatY: number = this._getY(pointLat);
      //set % left and % top
      let xx = ((actualLngX - this.axisX_start) * 100) / (this.axisX_end - this.axisX_start);
      let yy = ((actualLatY - this.axisY_start) * 100) / (this.axisY_end - this.axisY_start);

      this._createPoint(point,xx,yy);

    });
  }

  /**
   * Draw point
   */
  private _createPoint(point: PointVM,xx,yy){
    //create div with point img
    let div = document.createElement('div');
    div.style.top = yy + "%";
    div.style.left = xx + "%";
    div.style.position = "absolute";
    let img = document.createElement('img');
    img.style.cursor = "pointer";
    img.style.width = "30px";
    img.style.height = "44px";
    img.style.position = "relative";
    img.style.left = "-15px";
    img.style.top = "-44px";
    img.className = "point_map";
    //color marker
    var colorMarker: string = "orange";
    switch (this.settings.markerColor) {
      case 'white':
        colorMarker = "white";
        break;
      case 'black':
        colorMarker = "black";
        break;
    }
    //type marker
    switch (point.type) {
      case 'parking':
        img.src = "https://cdn.signorprestito.it/pinmap/parking_" + colorMarker + ".svg";
        break;
      case 'info':
        img.src = "https://cdn.signorprestito.it/pinmap/info_" + colorMarker + ".svg";
        break;
      case 'marker':
        img.src = "https://cdn.signorprestito.it/pinmap/marker_" + colorMarker + ".svg";
        break;
      case 'restaurant':
        img.src = "https://cdn.signorprestito.it/pinmap/restaurant_" + colorMarker + ".svg";
        break;
      default:
        img.src = "https://cdn.signorprestito.it/pinmap/marker_" + colorMarker + ".svg";
        break;
    }
    img.onclick = () => {
      //open modal or emit click
      this.settings.openModal ? this._openModal(point) : this._emitEvent(point);
    };
    div.appendChild(img);

    //append div
    let wrap = document.getElementById('wrapMap');
    wrap.appendChild(div);
  }

  clickOnArea(area: string){
    this.settings.openModal ? this._openModalArea(area) : this.clickArea.emit(area);
  }

  /**
   * Open modal point details
   */
  private _openModal(point: PointVM) {
    this.dialog.open(DialogPointComponent, {
      width: this.settings.modalWidth + '%',
      data: { "template": this.templatePoint, "dataContext": point },
    });
  }

  /**
   * Emit click event
   */
  private _emitEvent(point: PointVM) {
    this.clickPoint.emit(point);
  }

  /**
   * Open modal area details
   */
  private _openModalArea(area: string) {
    this.dialog.open(DialogAreaComponent, {
      data: { "template": this.templateArea, "dataContext": area },
      width: this.settings.modalWidth + '%',
    });
  }


  /**
   * Get lat lng of address
   */
  private _getLatLong(address: string): Promise<GoogleDirection> {
    return new Promise<GoogleDirection>((resolve, reject) => {
      var geocoder = new google.maps.Geocoder();
      geocoder.geocode({ 'address': address }, (results) => {
        if (!results || results.length <= 0) return reject(undefined);
        var latitude = results[0].geometry.location.lat();
        var longitude = results[0].geometry.location.lng();
        var result = new GoogleDirection();
        result.lat = latitude;
        result.long = longitude;
        resolve(result);
      }, (err) => {
        reject(err);
      });
    });
  }

  /**
   * Get X value from lng
   */
  private _getX(lng: number): number {
    return ((this.MAP_WIDTH / 360) * (180 + lng));
  }

  /**
   * Get Y value from lat
   */
  private _getY(lat: number): number {
    // convert from degrees to radians
    let latRad = lat * Math.PI / 180;

    // get y value
    let mercN = Math.log(Math.tan((Math.PI / 4) + (latRad / 2)));
    return (this.MAP_HEIGHT / 2) - (this.MAP_WIDTH * mercN / (2 * Math.PI));
  }
}
