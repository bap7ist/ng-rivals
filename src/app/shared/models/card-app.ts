export interface cardApp {
  id: number;
  name: string;
  info: {
    title: string;
    description: string;
    description2?: string;
  };
  scarcity: number;
  darkMode: boolean;
  cost: number;
  range: Array<number>;
  type: {
    main: string;
    sub: string;
  };
  attack?: {
    damage: number;
    salve?: number;
  };
}
