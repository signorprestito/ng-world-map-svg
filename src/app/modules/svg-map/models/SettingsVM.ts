import { PointVM } from './PointVM';

export interface ICustomConfig {
  googleAPIKey: string;
  country: string[];
  countryColors: string[];
}

export interface ISettingsVM {
  googleMap: boolean;
  zoomMap: number;
  styleGoogleMap: string;
  countryList: string[];
  countryColorList: string[];
  country: string;
  countryColor: string;
  strokeCountryColor: string;
  strokeCountryWidth: string;
  markerColor: string; //['orange','white','black']
  listPoints: PointVM[];
  openModal: boolean;
  modalWidth: number;
  googleMapApiKey: string;
  config: ICustomConfig;
}
export class SettingsVM implements ISettingsVM {
  public googleMap: boolean = true;
  public zoomMap: number=6;
  public styleGoogleMap: string = "silver";
  public countryList: string[]=["IT"];
  public countryColorList: string[]=["gray"];
  public country: string = "IT";
  public countryColor: string = "#003300";
  public strokeCountryColor: string= "white";
  public strokeCountryWidth: string="1px";
  public markerColor: string="orange";
  public listPoints: PointVM[] = [];
  public openModal: boolean = false;
  public modalWidth: number=30;
  public googleMapApiKey: string = "";
  public config: ICustomConfig;
}
