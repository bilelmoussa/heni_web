import { File, UPDATE_UPLOADED_PHOTO } from './types';

export function uploadPhoto(newPhoto: File) {
    return {
        type: UPDATE_UPLOADED_PHOTO,
        payload: newPhoto
    }
}