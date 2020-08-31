import { ADD_MESSAGE_ERROR, MessageErrorState, MessageErrorActionTypes } from './types';

const initialState: MessageErrorState = {
    message: ''
}

export function messageErrorReducer(
    state = initialState,
    action: MessageErrorActionTypes
): MessageErrorState {
    switch (action.type) {
        case ADD_MESSAGE_ERROR :{
            return {
                ...state,
                ...action.payload
            }
        }
        default:
            return state;
    }
}