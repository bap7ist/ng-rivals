import { resources } from './resources';

export interface tile {
  id: string;
  x: number;
  y: number;
  flipped: boolean;
  spinned: boolean;
  line: boolean;
  show: boolean;
  time: number;
  hover: boolean;
  dry: boolean;
  resources: resources;
}
