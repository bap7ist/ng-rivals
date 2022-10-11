export interface IApp {
  ashakName: string
  language: string
}

export interface IAppState {
  AppState: IApp;
}

export const initialAppState: IApp = {
  ashakName : 'qikaa',
  language : 'fr'
};