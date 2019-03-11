export interface IMapInfoVM {
  nord: number;
  sud: number;
  est: number;
  west: number;
  path: string;
  svg_width: number;
  svg_height: number;
  country: string;
}
export class MapInfoVM implements IMapInfoVM {
  public nord: number;
  public sud: number;
  public est: number;
  public west: number;
  public path: string;
  public svg_width: number;
  public svg_height: number;
  public country: string;
}
