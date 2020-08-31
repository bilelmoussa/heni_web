import { MessageErrorState, ADD_MESSAGE_ERROR } from './types';

export function addMessageError(newMessageError: MessageErrorState) {
    return{
        type: ADD_MESSAGE_ERROR,
        payload: newMessageError
    }
}