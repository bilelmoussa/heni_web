import { MessageSuccessState, ADD_MESSAGE_SUCCESS } from './types';

export function addMessageSuccess(newMessageSuccess: MessageSuccessState) {
    return{
        type: ADD_MESSAGE_SUCCESS,
        payload: newMessageSuccess
    }
}