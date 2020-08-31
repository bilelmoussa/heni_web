export interface MessageSuccessState {
    message: string;
}

export const ADD_MESSAGE_SUCCESS = 'ADD_MESSAGE_SUCCESS';

interface IAddMessageSuccessAction {
    type: typeof ADD_MESSAGE_SUCCESS;
    payload: MessageSuccessState
}

export type MessageSuccessActionTypes = IAddMessageSuccessAction;