export interface ErrorState {
    message: string;
}

export const ADD_ERROR = 'ADD_ERROR';

interface IAddErrorAction {
    type: typeof ADD_ERROR;
    payload: ErrorState
}

export type ErrorActionTypes = IAddErrorAction;

