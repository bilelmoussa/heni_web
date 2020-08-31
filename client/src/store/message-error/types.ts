export interface MessageErrorState {
    message: string;
}

export const ADD_MESSAGE_ERROR = 'ADD_MESSAGE_ERROR';

interface IAddMessageErrorAction {
    type: typeof ADD_MESSAGE_ERROR;
    payload: MessageErrorState
}

export type MessageErrorActionTypes = IAddMessageErrorAction;