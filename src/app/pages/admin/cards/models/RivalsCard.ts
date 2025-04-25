import { User } from "./user.interface";

export interface RivalsCard {
  _id: string;
  image: string;
  image_foil?: string;
  name_fr: string;
  name_en: string;
  category: string;
  class?: string;
  clan?: 'changeforme';
  deblocages?: string[];
  type: 'attaque' | 'tactique' | 'competence' | 'ashak' | 'guilde' | 'evenement' | 'ultime';
  subtype: string;
  rare: 'rare' | 'peu commune' | 'commune' | 'base' | 'schema' | 'exclusive' | 'guilde' | 'clan';
  ashak?:
    | 'qikaa'
    | 'atmos'
    | 'gyaleis'
    | 'orus'
    | 'renko'
    | 'phae'
    | 'yosh'
    | 'xhan';
  cost?: number | null;
  damage?: number | null;
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
  createdBy?: User;
  lastModifiedBy?: User;
  createdAt?: Date;
  updatedAt?: Date;
}
