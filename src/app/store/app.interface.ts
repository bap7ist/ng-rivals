export interface IApp {
  ashak: string
  language: string
}

export interface IAppState {
  AppState: IApp;
}

export const initialAppState: IApp = {
  ashak : 'qikaa',
  language : 'fr'
};