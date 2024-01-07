export interface RivalsCard {
  id: string;
  name_fr: string;
  name_en: string;
  type: 'attaque' | 'tactique' | 'competence' | 'ashak';
  subtype: string;
  rare: 'rare' | 'peu commune' | 'commune' | 'base' | 'schema' | 'exclusive';
  ashak?:
    | 'qikaa'
    | 'atmos'
    | 'gyaleis'
    | 'orus'
    | 'renko'
    | 'phae'
    | 'yosh'
    | 'xhan';
  cost: number;
  damage: number;
  salve?: number;
  range?: Array<number>;
  text_fr?: string;
  text_en?: string;
  bonus?: string;
  isDark: boolean;
  isWip?: boolean;
}
