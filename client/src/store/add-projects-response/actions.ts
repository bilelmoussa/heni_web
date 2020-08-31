import { ADD_ERROR_MSG, ADD_SUCCESS_MSG, ErrorMsgState, SuccessMsgState } from './types';

export function add_success_msg(successMsg: SuccessMsgState) {
    return{
        type: ADD_SUCCESS_MSG,
        payload: successMsg
    }
}

export function add_error_msg(errorMsg: ErrorMsgState) {
    return{
        type: ADD_ERROR_MSG,
        payload: errorMsg
    }
}