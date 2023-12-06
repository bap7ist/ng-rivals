export interface IApp {
  ashakName: string;
  language: string;
  ashakUrl: string;
  navigation: string;
}

export interface IAppState {
  AppState: IApp;
}

export const initialAppState: IApp = {
  ashakName: 'qikaa',
  language:
    localStorage.getItem('language') !== null
      ? localStorage.getItem('language')
      : navigator.language,
  ashakUrl: '',
  navigation: '',
};
