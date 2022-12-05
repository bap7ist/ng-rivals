
import { createReducer, on, Action } from '@ngrx/store';
import { initialAppState, IApp } from '../app.interface';
import { ashakChoice, ashakUrl, languageChoice } from '../actions/app.actions';

export const userFeatureKey = 'AppState';

export const reducer = createReducer(
  initialAppState as IApp,
  on(ashakChoice, (state, {ashakName}) => ({
    ...state,
    ashakName
  })),
  on(languageChoice, (state, {language}) => ({
    ...state,
    language
  })),
  on(ashakUrl, (state, {ashakUrl}) => ({
    ...state,
    ashakUrl
  })),
);

export function AppReducer(state: IApp, action: Action): IApp {
  return reducer(state as IApp, action as Action);
}