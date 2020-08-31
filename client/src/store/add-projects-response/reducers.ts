import { addProjectResState, ADD_SUCCESS_MSG, ADD_ERROR_MSG, AddProjectResActionTypes } from './types';

const initialState: addProjectResState = {
    success_msg: '',
    error_msg: '',
}

export function addProjectResReducer(
    state = initialState,
    action: AddProjectResActionTypes
): addProjectResState {
    switch (action.type) {
        case ADD_SUCCESS_MSG:
            return {
                ...state,
                success_msg: action.payload.success_msg
            }
        case ADD_ERROR_MSG:
            return {
                ...state,
                error_msg: action.payload.error_msg
            }
        default:
            return state;
    }
}