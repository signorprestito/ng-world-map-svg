export interface IPointVM{
  city: string;
  address: string;
  type: string;
  //customObj: any;
}

export class PointVM implements IPointVM{
  public city: string;
  public address: string;
  public type: string='marker';
  //public customObj: any={};
}
