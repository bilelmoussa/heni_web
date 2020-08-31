export interface addProjectResState {
    success_msg: string;
    error_msg: string
}

export interface SuccessMsgState {
    success_msg: string;
}

export interface ErrorMsgState {
    error_msg: string;
}

export const ADD_SUCCESS_MSG = 'ADD_SUCCESS_MSG';

export const ADD_ERROR_MSG = 'ADD_ERROR_MSG';

interface IAddSuccessMsgAction {
    type: typeof ADD_SUCCESS_MSG;
    payload: SuccessMsgState
} 

interface IAddErrorMsgAction {
    type: typeof ADD_ERROR_MSG;
    payload: ErrorMsgState
} 

export type AddProjectResActionTypes = IAddSuccessMsgAction | IAddErrorMsgAction