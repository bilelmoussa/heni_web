import { CHANGE_THEME, ThemeState, ThemeActionTypes } from './types';

const initialState: ThemeState = {
    darkState: false
}

export function themeReducer(
    state = initialState,
    action: ThemeActionTypes
): ThemeState {
    switch (action.type) {
        case CHANGE_THEME :{
            return {
                ...state,
                ...action.payload
            }
        }
        default:
            return state;
    }
}
