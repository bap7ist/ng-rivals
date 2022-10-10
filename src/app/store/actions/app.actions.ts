import { createAction, props } from '@ngrx/store';

export enum AppActionsType {
  ashakChoice = '[Ashak] choosing',
  languageChoice = '[Language] choosing'
}

export const ashakChoice = createAction(
  AppActionsType.ashakChoice,
  props<{ ashakName: string }>()
);

export const languageChoice = createAction(
  AppActionsType.languageChoice,
  props<{ language: string }>()
);

