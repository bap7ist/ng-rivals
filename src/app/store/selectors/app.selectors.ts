import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IApp, IAppState } from "../app.interface";
import { userFeatureKey } from "../reducers/app.reducers";

export const appState = createFeatureSelector<IApp>(userFeatureKey)
export const getAshak = createSelector(
    appState,
    (state: IApp) => state.ashak
)

export const getLanguage = createSelector(
    appState,
    (state: IApp) => state.language
)