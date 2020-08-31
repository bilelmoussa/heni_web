export interface ThemeState {
    darkState: boolean
}

export const CHANGE_THEME = 'CHANGE_THEME';

interface IChangeThemeAction {
    type : typeof CHANGE_THEME;
    payload: ThemeState
}

export type ThemeActionTypes = IChangeThemeAction;