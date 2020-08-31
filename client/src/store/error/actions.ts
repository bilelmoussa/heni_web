import { ErrorState, ADD_ERROR } from './types';

export function addError(newError: ErrorState) {
    return{
        type: ADD_ERROR,
        payload: newError
    }
}
