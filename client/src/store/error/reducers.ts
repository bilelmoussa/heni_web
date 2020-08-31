import { ADD_ERROR, ErrorState, ErrorActionTypes } from './types';

const initialState: ErrorState = {
    message: ''
}

export function errorReducer(
    state = initialState,
    action: ErrorActionTypes
): ErrorState {
    switch (action.type) {
        case ADD_ERROR :{
            return {
                ...state,
                ...action.payload
            }
        }
        default:
            return state;
    }
}