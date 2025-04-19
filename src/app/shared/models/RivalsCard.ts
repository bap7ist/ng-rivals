export interface RivalsCard {
  id: string;
  name_fr: string;
  name_en: string;
  type: 'attaque' | 'tactique' | 'competence' | 'ashak' | 'guilde' | 'evenement' | 'ultime';
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
  bonus_fr?: string;
  bonus_en?: string;
  explications_fr?: string;
  explications_en?: string;
  isDark: boolean;
  isWip?: boolean;
}
