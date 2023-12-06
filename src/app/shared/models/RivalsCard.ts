export interface RivalsCard {
  id: string;
  name_fr: string;
  name_en: string;
  type: string;
  subtype: string;
  rare: string;
  cost: number;
  damage: number;
  salve?: number;
  range?: Array<number>;
  text_fr?: string;
  text_en?: string;
  bonus?: string;
  isDark: boolean;
}
