import { ADD_MESSAGE_SUCCESS, MessageSuccessState, MessageSuccessActionTypes } from './types';

const initialState: MessageSuccessState = {
    message: ''
}

export function messageSuccessReducer(
    state = initialState,
    action: MessageSuccessActionTypes
): MessageSuccessState {
    switch (action.type) {
        case ADD_MESSAGE_SUCCESS :{
            return {
                ...state,
                ...action.payload
            }
        }
        default:
            return state;
    }
}