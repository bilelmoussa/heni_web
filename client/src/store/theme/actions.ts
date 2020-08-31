import { ThemeState, CHANGE_THEME } from './types';

export function switchTheme(darkState: ThemeState) {
    return {
        type: CHANGE_THEME,
        payload: darkState
    }
}
