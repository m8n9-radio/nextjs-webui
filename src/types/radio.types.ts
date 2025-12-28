export interface IListen {
  current: number;
  peak: number;
}

export interface IRadio {
  name: string;
  description: string;
  streamUrl: string;
  listener: IListen;
}
